from FiberScrapper import FiberAddressScraper
import enum

class FiberScrapperOptions(enum.Enum):
    unlimited = 1
    parnter = 2
    cellcom = 3


def scrapperFactory(scrapper: FiberScrapperOptions):
    scrapperResult = None
    
    if scrapper == FiberScrapperOptions.unlimited:
        scrapperResult = FiberAddressScraper(unlimitedUrl, unlimitedCityNameXpath, unlimitedStreetNameXpath, unlimitedHouserNumberXpath,
                                        unlimitedSubmitBtnXpath, unlimitedSuccessHeaderXpath, unlimitedSuccessHeader)
                                        
    elif scrapper == FiberScrapperOptions.parnter:
        scrapperResult = FiberAddressScraper(partnerUrl, partnerCityNameXpath, partnerStreetNameXpath, partnerHouserNumberXpath,
                                        partnerSubmitBtnXpath, partnerSuccessHeaderXpath, partnerSuccessHeader)
    elif scrapper == FiberScrapperOptions.cellcom:
        scrapperResult = FiberAddressScraper(cellcomUrl, cellcomCityNameXpath, cellcomStreetNameXpath, cellcomHouserNumberXpath,
                                        cellcomSubmitBtnXpath, cellcomSuccessHeaderXpath, cellcomSuccessHeader)
    else:
        raise Exception('No scrapper in this kind..')                                                  

    return scrapperResult    




# unlimited:
unlimitedUrl = 'https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/'
unlimitedCityNameXpath = '//*[@id="input_1_3"]'
unlimitedStreetNameXpath = '//*[@id="input_1_4"]'
unlimitedHouserNumberXpath = '//*[@id="input_1_6"]'
unlimitedSubmitBtnXpath = '//*[@id="gform_submit_button_1"]'
unlimitedSuccessHeaderXpath = '//*[@id="be_in_touch"]/div/div/header/h2'
unlimitedSuccessHeader = "איזה כיף הכתובת מחוברת"

# cellcom
cellcomUrl = 'https://cellcom.co.il/sale/internet/300_2/'
cellcomCityNameXpath = '//*[@id="city"]'
cellcomStreetNameXpath = '//*[@id="street"]'
cellcomHouserNumberXpath = '//*[@id="home"]'
cellcomSubmitBtnXpath = '//*[@id="btnSubmit"]'
cellcomSuccessHeaderXpath = '/html/body/div[2]/div[1]/div/div/div/div[3]/div[1]/h1[2]'
cellcomSuccessHeader = "מעולה, יש לכם תשתית סיבים מוכנה בבניין"

# partner
partnerUrl = 'https://www.partner.co.il/globalassets/global/privatefiber/index.html'
partnerCityNameXpath = '//*[@id="AfibersLeadCity"]'
partnerStreetNameXpath = '//*[@id="installationStree"]'
partnerHouserNumberXpath = '//*[@id="houseNum"]'
partnerSubmitBtnXpath = '//*[@id="sendBtn"]'
partnerSuccessHeaderXpath = '//*[@id="AfibersSectionLead"]/div[2]/div/div[1]/h3'
partnerSuccessHeader = 'יש! כבר הגענו לבניין שלך'


