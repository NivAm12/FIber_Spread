from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

# TODO: fix the success search
# TODO: build algorithem 

class FiberAddressScraper:
    def __init__(self, addressToScrapeUrl, cityNameXpath, streetNameXpath,
                houserNumberXpath, submitBtnXpath, successHeaderXpath, successHeaderStr):
                self.addressToScrape = addressToScrapeUrl
                self.successHeader = successHeaderStr
                self.cityNameXpath = cityNameXpath
                self.streetNameXpath = streetNameXpath 
                self.houserNumberXpath = houserNumberXpath
                self.submitBtnElementXpath = submitBtnXpath
                self.successHeaderXpath = successHeaderXpath


    def checkIfAddressHasFibers(self, cityName, streetName, houseNumber):
        try:
            # start session:
            self.__startWebSession()
            
            # fill the form inputs:
            self.__fillElement(self.cityNameXpath, cityName)
            self.__fillElement(self.streetNameXpath, streetName)
            self.__fillElement(self.houserNumberXpath, houseNumber)

            # submit:
            if self.webDriver.find_elements_by_xpath(self.submitBtnElementXpath):
                self.webDriver.find_element_by_xpath(self.submitBtnElementXpath).click()

            # check if the address search has succeed:
            time.sleep(1)
            success =  self.__checkIfSearchSucceed()

        except Exception as e:
            success = False
            print(e)

        finally:
            self.__quitSession()
            return success    
            
            

    def __fillElement(self, elementToFillXpath, searchQuery):

        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(searchQuery)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.RETURN)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.TAB)
        time.sleep(1)


    def __checkIfSearchSucceed(self):
        success = False
        header = self.webDriver.find_element_by_xpath(self.successHeaderXpath).text

        if self.successHeader in header:
            success = True
            
        return success


    def __startWebSession(self):
        op = webdriver.ChromeOptions()
        #op.add_argument('headless')
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.webDriver = webdriver.Chrome(options=op)     
        self.webDriver.get(self.addressToScrape)
        time.sleep(4)


    def __quitSession(self):
        self.webDriver.quit()    


# tests:
####### pages scrape info
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
partnerUrl = 'https://www.partner.co.il/globalassets/global/fiberinternet/index.html'
partnerCityNameXpath = '//*[@id="AfibersLeadCity"]'
partnerStreetNameXpath = '//*[@id="installationStree"]'
partnerHouserNumberXpath = '//*[@id="houseNum"]'
partnerSubmitBtnXpath = '//*[@id="sendBtn"]'
partnerSuccessHeaderXpath = '//*[@id="AfibersSectionLead"]/div[2]/div/div[1]/h3'
partnerSuccessHeader = "הכל מוכן והבניין שלך מחובר"


city = 'בת ים'
street = 'הרב מימון'
houserNumber = 50
testObj = FiberAddressScraper(unlimitedUrl, unlimitedCityNameXpath, unlimitedStreetNameXpath, unlimitedHouserNumberXpath,
                              unlimitedSubmitBtnXpath, unlimitedSuccessHeaderXpath, unlimitedSuccessHeader)
print(testObj.checkIfAddressHasFibers(city, street, houserNumber))




