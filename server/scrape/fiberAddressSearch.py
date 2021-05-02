from fiberScrapperFactory import FiberScrapperOptions, scrapperFactory
import sys
from joblib import Parallel, delayed
import json


unlimitedScrapper = scrapperFactory(FiberScrapperOptions.unlimited)
partnerScrapper = scrapperFactory(FiberScrapperOptions.parnter)
cellcomScrapper = scrapperFactory(FiberScrapperOptions.cellcom)
scrappers = [{"obj": partnerScrapper, "name": "partner"}, {"obj": unlimitedScrapper, "name": "unlimited"}, {"obj": cellcomScrapper, "name": "cellcom"}]


def searchForFibers(cityName, streetName, houseNumber, scrappers):
    results = Parallel(n_jobs=-1)(delayed(searchForFiberProccess)
                        (scrapper=scrapper, cityName=cityName, streetName=streetName, houseNumber=houseNumber)
                            for scrapper in scrappers)
                                           
    return results


def searchForFiberProccess(scrapper, cityName, streetName, houseNumber):
    
    return {scrapper["name"]: scrapper["obj"].checkIfAddressHasFibers(cityName, streetName, houseNumber)}
    

# send the result to Node js:        
results = searchForFibers(sys.argv[1], sys.argv[2], sys.argv[3], scrappers)
print(json.dumps(results))

        
    
  




