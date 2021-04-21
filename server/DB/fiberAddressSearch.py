from fiberScrapperFactory import FiberScrapperOptions, scrapperFactory
import sys
from joblib import Parallel, delayed


unlimitedScrapper = scrapperFactory(FiberScrapperOptions.unlimited)
partnerScrapper = scrapperFactory(FiberScrapperOptions.parnter)
cellcomScrapper = scrapperFactory(FiberScrapperOptions.cellcom)
scrappers = [unlimitedScrapper, partnerScrapper, cellcomScrapper]


def searchForFibers(cityName, streetName, houseNumber, scrappers):
    results = Parallel(n_jobs=-1)(delayed(searchForFiberProccess)
                        (scrapper=scrapper, cityName=cityName, streetName=streetName, houseNumber=houseNumber)
                            for scrapper in scrappers)
                            
    return results


def searchForFiberProccess(scrapper, cityName, streetName, houseNumber):
    print("im inside sfseffdfsd")
    return scrapper.checkIfAddressHasFibers(cityName, streetName, houseNumber)


city = 'בת ים'
street = 'הרב מימון'
houserNumber = 4
print(searchForFibers(city, street, houserNumber, scrappers))
        
    
  




