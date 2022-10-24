from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import math

link='http://suninjuly.github.io/alert_accept.html'
def calc(x):
    return str(math.log(abs(12*math.sin(int(x)))))

try:
    browser=webdriver.Chrome()
    browser.get(link)
    first_button=browser.find_element(By.TAG_NAME,'button')
    first_button.click()
    time.sleep(3)
    confirm=browser.switch_to.alert
    confirm.accept()

    time.sleep(3)

    elem=browser.find_element(By.ID,'input_value')
    number=int(elem.text)
    y=calc(number)
    input1=browser.find_element(By.TAG_NAME,"input")
    input1.send_keys(y)
    second_button=browser.find_element(By.CSS_SELECTOR,'button.btn')
    second_button.click()
finally:
    time.sleep(5)
    browser.quit()