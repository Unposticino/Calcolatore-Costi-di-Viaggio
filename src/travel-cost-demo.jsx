import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Calendar, MapPin, Car, Home, Activity, Shield, StickyNote, Download } from 'lucide-react';

// Componente DynamicList fuori dal componente principale
const DynamicList = React.memo(({ items, onAddItem, onRemoveItem, onUpdateItem, fields, addText }) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div key={item.id || index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        {fields.map(field => (
          <input
            key={`${field.key}-${item.id || index}`}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={item[field.key] || ''}
            onChange={(e) => onUpdateItem(index, field.key, e.target.value)}
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ))}
        <button
          onClick={() => onRemoveItem(index)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1 sm:mt-0"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ))}
    <button
      onClick={() => onAddItem(fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}))}
      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mt-2"
    >
      <Plus size={16} />
      {addText}
    </button>
  </div>
));

const TravelCostCalculator = () => {
  // Stati per i dati base
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nights, setNights] = useState(0);

  // Stati per i costi del veicolo
  const [totalKm, setTotalKm] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [fuelPrices, setFuelPrices] = useState([{ country: '', price: '', id: Date.now() }]);
  const [tolls, setTolls] = useState([{ description: '', cost: '', id: Date.now() + 1 }]);
  const [ferries, setFerries] = useState([{ description: '', cost: '', id: Date.now() + 2 }]);
  const [trains, setTrains] = useState([{ description: '', cost: '', id: Date.now() + 3 }]);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [additionalInsurance, setAdditionalInsurance] = useState('');

  // Stati per soggiorno
  const [dailyMealBudget, setDailyMealBudget] = useState('');
  const [accommodations, setAccommodations] = useState([{ description: '', cost: '', nights: '1', id: Date.now() + 4 }]);
  const [activities, setActivities] = useState([{ description: '', cost: '', id: Date.now() + 5 }]);

  // Stati per costi aggiuntivi
  const [healthInsurance, setHealthInsurance] = useState('');
  const [vaccines, setVaccines] = useState([{ description: '', cost: '', id: Date.now() + 6 }]);
  const [esims, setEsims] = useState([{ description: '', cost: '', id: Date.now() + 7 }]);

  // Stati per note e paesi
  const [visitedCountries, setVisitedCountries] = useState('');
  const [importantNotes, setImportantNotes] = useState('');

  // Calcolo automatico delle notti
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [startDate, endDate]);

  // Funzioni helper stabili
  const addItem = useCallback((setter, initialValue) => {
    setter(prev => [...prev, { ...initialValue, id: Date.now() + Math.random() }]);
  }, []);

  const removeItem = useCallback((setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateItem = useCallback((setter, index, field, value) => {
    setter(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  }, []);

  // Handlers per le liste (rimangono invariati)
  const handleFuelPriceAdd = useCallback((item) => addItem(setFuelPrices, item), [addItem]);
  const handleFuelPriceRemove = useCallback((index) => removeItem(setFuelPrices, index), [removeItem]);
  const handleFuelPriceUpdate = useCallback((index, field, value) => updateItem(setFuelPrices, index, field, value), [updateItem]);

  const handleTollsAdd = useCallback((item) => addItem(setTolls, item), [addItem]);
  const handleTollsRemove = useCallback((index) => removeItem(setTolls, index), [removeItem]);
  const handleTollsUpdate = useCallback((index, field, value) => updateItem(setTolls, index, field, value), [updateItem]);

  const handleFerriesAdd = useCallback((item) => addItem(setFerries, item), [addItem]);
  const handleFerriesRemove = useCallback((index) => removeItem(setFerries, index), [removeItem]);
  const handleFerriesUpdate = useCallback((index, field, value) => updateItem(setFerries, index, field, value), [updateItem]);

  const handleTrainsAdd = useCallback((item) => addItem(setTrains, item), [addItem]);
  const handleTrainsRemove = useCallback((index) => removeItem(setTrains, index), [removeItem]);
  const handleTrainsUpdate = useCallback((index, field, value) => updateItem(setTrains, index, field, value), [updateItem]);

  const handleAccommodationsAdd = useCallback((item) => addItem(setAccommodations, item), [addItem]);
  const handleAccommodationsRemove = useCallback((index) => removeItem(setAccommodations, index), [removeItem]);
  const handleAccommodationsUpdate = useCallback((index, field, value) => updateItem(setAccommodations, index, field, value), [updateItem]);

  const handleActivitiesAdd = useCallback((item) => addItem(setActivities, item), [addItem]);
  const handleActivitiesRemove = useCallback((index) => removeItem(setActivities, index), [removeItem]);
  const handleActivitiesUpdate = useCallback((index, field, value) => updateItem(setActivities, index, field, value), [updateItem]);

  const handleVaccinesAdd = useCallback((item) => addItem(setVaccines, item), [addItem]);
  const handleVaccinesRemove = useCallback((index) => removeItem(setVaccines, index), [removeItem]);
  const handleVaccinesUpdate = useCallback((index, field, value) => updateItem(setVaccines, index, field, value), [updateItem]);

  const handleEsimsAdd = useCallback((item) => addItem(setEsims, item), [addItem]);
  const handleEsimsRemove = useCallback((index) => removeItem(setEsims, index), [removeItem]);
  const handleEsimsUpdate = useCallback((index, field, value) => updateItem(setEsims, index, field, value), [updateItem]);

  // Calcoli dei costi rimangono invariati
  const calculateFuelCost = () => {
    if (!totalKm || !fuelConsumption) return 0;
    const validPrices = fuelPrices.filter(p => p.price && !isNaN(p.price));
    if (validPrices.length === 0) return 0;
    const avgPrice = validPrices.reduce((sum, p) => sum + parseFloat(p.price), 0) / validPrices.length;
    return (parseFloat(totalKm) / parseFloat(fuelConsumption)) * avgPrice;
  };

  const calculateListTotal = (list) => {
    return list.reduce((sum, item) => {
      const cost = parseFloat(item.cost) || 0;
      const nights = parseFloat(item.nights) || 1;
      return sum + (cost * nights);
    }, 0);
  };

  const calculateMealsCost = () => {
    if (!dailyMealBudget || !nights) return 0;
    return parseFloat(dailyMealBudget) * nights;
  };

  const fuelCost = calculateFuelCost();
  const tollsCost = calculateListTotal(tolls);
  const ferriesCost = calculateListTotal(ferries);
  const trainsCost = calculateListTotal(trains);
  const insuranceCost = hasInsurance ? 0 : (parseFloat(additionalInsurance) || 0);
  const mealsCost = calculateMealsCost();
  const accommodationsCost = calculateListTotal(accommodations);
  const activitiesCost = calculateListTotal(activities);
  const healthInsuranceCost = parseFloat(healthInsurance) || 0;
  const vaccinesCost = calculateListTotal(vaccines);
  const esimsCost = calculateListTotal(esims);

  const totalCost =

