from fiberScrapperFactory import FiberScrapperOptions, scrapperFactory
import sys
from joblib import Parallel, delayed


unlimitedScrapper = scrapperFactory(FiberScrapperOptions.unlimited)
partnerScrapper = scrapperFactory(FiberScrapperOptions.parnter)
cellcomScrapper = scrapperFactory(FiberScrapperOptions.cellcom)
scrappers = [{'obj': partnerScrapper, 'name': 'partner'}, {'obj': unlimitedScrapper, 'name': 'unlimited'}, {'obj': cellcomScrapper, 'name': 'cellcom'}]


def searchForFibers(cityName, streetName, houseNumber, scrappers):
    results = Parallel(n_jobs=-1)(delayed(searchForFiberProccess)
                        (scrapper=scrapper, cityName=cityName, streetName=streetName, houseNumber=houseNumber)
                            for scrapper in scrappers)
                            
    return results


def searchForFiberProccess(scrapper, cityName, streetName, houseNumber):
    
    return {scrapper['name']: scrapper['obj'].checkIfAddressHasFibers(cityName, streetName, houseNumber)}
    
        


city = 'בת ים'
street = 'הרב מימון'
houserNumber = 21
print(searchForFibers(city, street, houserNumber, scrappers))
        
    
  




