import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Calendar, MapPin, Car, Home, Activity, Shield, StickyNote, Download } from 'lucide-react';

// Componente DynamicList fuori dal componente principale
const DynamicList = React.memo(({ items, onAddItem, onRemoveItem, onUpdateItem, fields, addText }) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div key={item.id || index} className="flex gap-2 items-center">
        {fields.map(field => (
          <input
            key={`${field.key}-${item.id || index}`}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={item[field.key] || ''}
            onChange={(e) => onUpdateItem(index, field.key, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ))}
        <button
          onClick={() => onRemoveItem(index)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ))}
    <button
      onClick={() => onAddItem(fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}))}
      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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

  // Handlers per le liste
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

  // Calcoli dei costi
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

  const totalCost = fuelCost + tollsCost + ferriesCost + trainsCost + insuranceCost + 
                   mealsCost + accommodationsCost + activitiesCost + healthInsuranceCost + 
                   vaccinesCost + esimsCost;

  // Funzione per generare il report
  const generateReport = useCallback(() => {
    try {
      const content = `RIEPILOGO COSTI DI VIAGGIO
========================

DATI DEL VIAGGIO:
${destination ? `Destinazione: ${destination}` : ''}
${startDate ? `Data inizio: ${new Date(startDate).toLocaleDateString('it-IT')}` : ''}
${endDate ? `Data fine: ${new Date(endDate).toLocaleDateString('it-IT')}` : ''}
${nights > 0 ? `Numero di notti: ${nights}` : ''}

COSTI TRASPORTO:
Carburante: €${fuelCost.toFixed(2)}
Pedaggi: €${tollsCost.toFixed(2)}
Traghetti: €${ferriesCost.toFixed(2)}
Treni: €${trainsCost.toFixed(2)}
Assicurazione: €${insuranceCost.toFixed(2)}

COSTI SOGGIORNO:
Pasti: €${mealsCost.toFixed(2)}
Pernottamenti: €${accommodationsCost.toFixed(2)}
Attività: €${activitiesCost.toFixed(2)}

COSTI AGGIUNTIVI:
Assicurazione sanitaria: €${healthInsuranceCost.toFixed(2)}
Vaccini: €${vaccinesCost.toFixed(2)}
E-sim: €${esimsCost.toFixed(2)}

========================
COSTO TOTALE DEL VIAGGIO: €${totalCost.toFixed(2)}
========================

Generato il ${new Date().toLocaleDateString('it-IT')}`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      const fileName = destination ? 
        `viaggio-${destination.replace(/\s+/g, '-').toLowerCase()}.txt` : 
        'riepilogo-viaggio.txt';
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Errore nella generazione del file:', error);
      alert('Errore nel download. Riprova.');
    }
  }, [destination, startDate, endDate, nights, fuelCost, tollsCost, ferriesCost, trainsCost, insuranceCost, mealsCost, accommodationsCost, activitiesCost, healthInsuranceCost, vaccinesCost, esimsCost, totalCost]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <MapPin size={32} />
                Calcolatore Costi di Viaggio
              </h1>
              <p className="mt-2 opacity-90">Pianifica il tuo budget di viaggio in modo preciso</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center">
                <div className="text-center text-xs text-gray-800">
                  <div className="font-bold mb-1">unposticino</div>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 bg-red-600 rounded"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Dati Base */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              Dati Base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destinazione</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Es. Roma, Parigi, Barcellona"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data inizio</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data fine</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {nights > 0 && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 font-medium">Numero di notti: {nights}</p>
              </div>
            )}
          </section>

          {/* Costi Veicolo */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Car className="text-green-600" size={20} />
              Costi del Veicolo e Trasporto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chilometri totali</label>
                <input
                  type="number"
                  value={totalKm}
                  onChange={(e) => setTotalKm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consumo medio (km/l)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="15.5"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Assicurazione inclusa</span>
                </label>
              </div>
            </div>

            {!hasInsurance && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Costo assicurazione aggiuntiva (€)</label>
                <input
                  type="number"
                  value={additionalInsurance}
                  onChange={(e) => setAdditionalInsurance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="150"
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Prezzi carburante per paese</h3>
                <DynamicList
                  items={fuelPrices}
                  onAddItem={handleFuelPriceAdd}
                  onRemoveItem={handleFuelPriceRemove}
                  onUpdateItem={handleFuelPriceUpdate}
                  fields={[
                    { key: 'country', placeholder: 'Paese' },
                    { key: 'price', type: 'number', placeholder: 'Prezzo €/l' }
                  ]}
                  addText="Aggiungi paese"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Pedaggi autostradali</h3>
                <DynamicList
                  items={tolls}
                  onAddItem={handleTollsAdd}
                  onRemoveItem={handleTollsRemove}
                  onUpdateItem={handleTollsUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione pedaggio' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi pedaggio"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Traghetti</h3>
                <DynamicList
                  items={ferries}
                  onAddItem={handleFerriesAdd}
                  onRemoveItem={handleFerriesRemove}
                  onUpdateItem={handleFerriesUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione traghetto' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi traghetto"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Treni</h3>
                <DynamicList
                  items={trains}
                  onAddItem={handleTrainsAdd}
                  onRemoveItem={handleTrainsRemove}
                  onUpdateItem={handleTrainsUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione treno' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi treno"
                />
              </div>
            </div>
          </section>

          {/* Costi Soggiorno */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Home className="text-purple-600" size={20} />
              Costi di Viaggio e Soggiorno
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget giornaliero pasti (€)</label>
              <input
                type="number"
                value={dailyMealBudget}
                onChange={(e) => setDailyMealBudget(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Pernottamenti</h3>
                <DynamicList
                  items={accommodations}
                  onAddItem={handleAccommodationsAdd}
                  onRemoveItem={handleAccommodationsRemove}
                  onUpdateItem={handleAccommodationsUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione alloggio' },
                    { key: 'cost', type: 'number', placeholder: 'Costo per notte €' },
                    { key: 'nights', type: 'number', placeholder: 'Notti' }
                  ]}
                  addText="Aggiungi alloggio"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Attività e attrazioni</h3>
                <DynamicList
                  items={activities}
                  onAddItem={handleActivitiesAdd}
                  onRemoveItem={handleActivitiesRemove}
                  onUpdateItem={handleActivitiesUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione attività' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi attività"
                />
              </div>
            </div>
          </section>

          {/* Costi Aggiuntivi */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="text-red-600" size={20} />
              Costi Aggiuntivi
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assicurazione sanitaria (€)</label>
              <input
                type="number"
                value={healthInsurance}
                onChange={(e) => setHealthInsurance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Vaccini obbligatori</h3>
                <DynamicList
                  items={vaccines}
                  onAddItem={handleVaccinesAdd}
                  onRemoveItem={handleVaccinesRemove}
                  onUpdateItem={handleVaccinesUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione vaccino' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi vaccino"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">E-sim</h3>
                <DynamicList
                  items={esims}
                  onAddItem={handleEsimsAdd}
                  onRemoveItem={handleEsimsRemove}
                  onUpdateItem={handleEsimsUpdate}
                  fields={[
                    { key: 'description', placeholder: 'Descrizione e-sim' },
                    { key: 'cost', type: 'number', placeholder: 'Costo €' }
                  ]}
                  addText="Aggiungi e-sim"
                />
              </div>
            </div>
          </section>

          {/* Note e Paesi */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <StickyNote className="text-yellow-600" size={20} />
              Punti da Ricordare
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paesi visitati</label>
                <input
                  type="text"
                  value={visitedCountries}
                  onChange={(e) => setVisitedCountries(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Italia, Francia, Spagna"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note importanti</label>
                <textarea
                  value={importantNotes}
                  onChange={(e) => setImportantNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Documenti necessari, patenti speciali, normative locali..."
                />
              </div>
            </div>
          </section>

          {/* Riepilogo */}
          <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Riepilogo Costi</h2>
              <button
                onClick={generateReport}
                className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <Download size={18} />
                Scarica Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Carburante:</span>
                  <span>€{fuelCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pedaggi:</span>
                  <span>€{tollsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Traghetti:</span>
                  <span>€{ferriesCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Treni:</span>
                  <span>€{trainsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assicurazione:</span>
                  <span>€{insuranceCost.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pasti:</span>
                  <span>€{mealsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pernottamenti:</span>
                  <span>€{accommodationsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attività:</span>
                  <span>€{activitiesCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assicurazione sanitaria:</span>
                  <span>€{healthInsuranceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Altri costi:</span>
                  <span>€{(vaccinesCost + esimsCost).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span>TOTALE VIAGGIO:</span>
                <span>€{totalCost.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TravelCostCalculator;