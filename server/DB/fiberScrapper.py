from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


# get control of the browser
unlimitedWeb = webdriver.Chrome()
unlimitedRrl = 'https://www.partner.co.il/globalassets/global/fiberinternet/index.html'
unlimitedWeb.get(unlimitedRrl)

time.sleep(2)

# get the form input fields
cityName = 'תל אביב - יפו'
streetName = 'זטורי משה'
houseNumber = 4

cityNameXpath = '//*[@id="AfibersLeadCity"]'
cityNameFormInput = unlimitedWeb.find_element_by_xpath(cityNameXpath)

streetNameXpath = '//*[@id="installationStree"]'
streetNameFormInput = unlimitedWeb.find_element_by_xpath(streetNameXpath)

houserNumberXpath = '//*[@id="houseNum"]'
houserNumberFormInput = unlimitedWeb.find_element_by_xpath(houserNumberXpath)

cityNameFormInput.send_keys(cityName)
cityNameFormInput.send_keys(Keys.TAB)
time.sleep(0.5)

streetNameFormInput.send_keys(streetName)
streetNameFormInput.send_keys(Keys.TAB)
time.sleep(0.5)

houserNumberFormInput.send_keys(houseNumber)
time.sleep(1)

# submit
unlimitedWeb.find_element_by_xpath('//*[@id="sendBtn"]').click()




