import { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

export const CountryCodeSearch = ({ value, setValue }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
        const data = await response.json();
        
        const formatted = data.map(c => ({
          name: c.name.common,
          code: c.cca2,
          dialCode: c.idd.root + (c.idd.suffixes?.[0] || ''),
          flag: c.flag
        })).sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(formatted);
        setFilteredCountries(formatted);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCountries(
        countries.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          c.dialCode.includes(searchTerm)
        )
      );
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  useEffect(() => { 
    console.log(value, countries[0])

    if(countries.length>0) {
      let c = countries.find((item)=> item.dialCode == value) 
      if(c) {
        selectCountry(c)
      }
    }

  }, [value, countries])
  

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setValue('countryCode', country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.dialCode}</span>
            </>
          ) : (
            <span>Select country</span>
          )}
        </div>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search country..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                onClick={() => selectCountry(country)}
                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <span className="mr-2">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-gray-500 dark:text-gray-400">{country.dialCode}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};