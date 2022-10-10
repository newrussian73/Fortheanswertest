from selenium import webdriver
from selenium.webdriver.common.by import By
import time


link="http://suninjuly.github.io/registration1.html"
link2="http://suninjuly.github.io/registration2.html"

def test_reg1():
    browser = webdriver.Chrome()
    browser.get(link)
    input1 = browser.find_element(By.XPATH,'//input[@placeholder="Input your first name"]')
    input1.send_keys("test")
    input2 = browser.find_element(By.XPATH,'//input[@placeholder="Input your last name"]')
    input2.send_keys("test")
    input3 = browser.find_element(By.XPATH,'//input[@placeholder="Input your email"]')
    input3.send_keys("test")
    button = browser.find_element(By.CSS_SELECTOR,"button.btn")
    button.click()
    welcome_text_elt=browser.find_element(By.TAG_NAME,"h1")
    welcome_text=welcome_text_elt.text
    assert welcome_text == "Congratulations! You have successfully registered!", 'vse ok'

def test_reg2():
    browser = webdriver.Chrome()
    browser.get(link2)
    input1 = browser.find_element(By.XPATH,'//input[@placeholder="Input your first name"]')
    input1.send_keys("test")
    input2 = browser.find_element(By.XPATH,'//input[@placeholder="Input your last name"]')
    input2.send_keys("test")
    input3 = browser.find_element(By.XPATH,'//input[@placeholder="Input your email"]')
    input3.send_keys("test")
    button = browser.find_element(By.CSS_SELECTOR,"button.btn")
    button.click()
    welcome_text_elt = browser.find_element(By.TAG_NAME,"h1")
    welcome_text = welcome_text_elt.text
    browser.quit()
    assert welcome_text == "Congratulations! You have successfully registered!", 'vse ok'









