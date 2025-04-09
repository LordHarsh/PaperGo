import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def scrape_ieee(url):
    # Setup the WebDriver (you can use other drivers like Firefox too)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")  # Use new headless mode (safer with newer Chrome)
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-software-rasterizer")
    options.add_argument("--remote-debugging-port=9222")
    options.binary_location = "/usr/bin/google-chrome"  # or chromium-browser, if that's what you installed


    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Open the webpage
    driver.get(url)

    try:
        # Wait for the results to load (adjust the wait condition based on the content you're waiting for)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div.List-results-item'))
        )
        
        # Once loaded, get the page source and parse it with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        articles = soup.find_all('div', {'class': 'List-results-item'})

        with open('papers.csv', 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Title', 'Authors', 'Abstract', 'Publication Date'])
            
            for article in articles:
                title = article.find('h2', {'class': 'title'}).text.strip() if article.find('h2', {'class': 'title'}) else 'N/A'
                authors = article.find('p', {'class': 'authors'}).text.strip() if article.find('p', {'class': 'authors'}) else 'N/A'
                abstract = article.find('div', {'class': 'description'}).text.strip() if article.find('div', {'class': 'description'}) else 'N/A'
                date = article.find('span', {'class': 'pub-type'}).text.strip() if article.find('span', {'class': 'pub-type'}) else 'N/A'
                
                writer.writerow([title, authors, abstract, date])

    finally:
        driver.quit()  # Close the browser after scraping

# URL to scrape
url = 'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=research+papers'
scrape_ieee(url)
