import requests
import json
import csv
import concurrent.futures
from pathlib import Path

HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9,si;q=0.8',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://promoscore.io',
    'priority': 'u=1, i',
    'referer': 'https://promoscore.io/offers',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'x-app-version': '1.5.1',
    'x-client-platform': 'web',
    'x-country-code': 'false'
}

COOKIES = {
    'cookie_consent': '...',
    'search': '...'
}

RETAILERS = [
    "eurocash dystrybucja", "selgros", "carrefour", "kaufland", "biedronka", "e.leclerc hipermarket",
    "auchan", "eurocash", "lidl", "merkury market", "makro", "netto", "polomarket",
    "eurocash serwis", "intermarche", "aldi", "dino", "drogerie laboo", "mega image",
    "drogerie jasmin", "carrefour market", "bi1", "dm drogerie markt", "pingvin patika",
    "penny", "dealz", "drogerie polskie", "drogerie jawa", "jysk", "e.leclerc supermarket",
    "drogerie koliber", "rossmann", "hebe", "dm", "profi", "supeco", "benu gyógyszertár",
    "kulcs patika", "media markt", "sps handel cash & carry", "profi loco", "cba nord vest c&c",
    "żabka", "kik", "patika plus", "profi city", "sipo patika", "csillag patika", "pepco",
    "gyöngy patikák", "prim market", "auchan supermarket", "profi go", "drogerie laboo partner",
    "stokrotka", "atac by auchan", "moje auchan", "alma gyógyszertárak",
    "carrefour express minimarket", "la doi pasi", "unknown", "szimpatika",
    "super-pharm", "atac", "kakto", "carrefour express convenience", "globi", "abc",
    "groszek", "lewiatan"
]

BASE_PATH = Path("retailer_store_data")
BASE_PATH.mkdir(exist_ok=True)

LAT_LNG = "44.4267674, 26.1025384"


def fetch_ids(retailer):
    payload = [
        {
            "indexName": "search-promoscore-promotions",
            "params": {
                "aroundLatLng": LAT_LNG,
                "aroundRadius": 90000000,
                "facetFilters": [[f"retailer:{retailer.lower()}"]],
                "facets": ["brand", "category", "characteristics_search", "market", "origin", "promo_score", "retailer"],
                "favoriteKey": "id",
                "filters": "NOT offer_type:coupon AND promo_location:flyer",
                "highlightPostTag": "__/ais-highlight__",
                "highlightPreTag": "__ais-highlight__",
                "hitsPerPage": 3,
                "maxValuesPerFacet": 20,
                "page": 0,
                "query": ""
            }
        }
    ]

    r = requests.post(
        'https://promoscore.io/api/search/search-promoscore-promotions',
        headers=HEADERS, cookies=COOKIES,
        data=json.dumps(payload)
    )

    data = r.json()
    hits = data['results'][0].get('hits', [])

    result = []
    for hit in hits:
        name = hit.get('retailer', {}).get('name', '').lower()
        if name == retailer.lower():
            result.append({"retailer": name, "id": hit['id']})
            break
    return retailer, result


def fetch_offer_data(item):
    offer_id = item['id']
    r = requests.get(
        f"https://promoscore.io/api/offers/{offer_id}",
        headers=HEADERS, cookies=COOKIES
    )
    if r.status_code != 200:
        return None
    return r.json()['data']


def fetch_store_data(retailer_id):
    r = requests.get(
        f"https://promoscore.io/api/retailers/{retailer_id}/nearest-store?latLng=44.4267674%2C26.1025384&distance=9000000",
        headers=HEADERS, cookies=COOKIES
    )
    if r.status_code != 200:
        return None
    return r.json()['data']


def save_csv(data, filename):
    print("saving file ... ", filename)
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        for row in data:
            writer.writerow(row)

detailed_rows = []
def process_retailer(retailer):
    print ("Fetching ->",retailer)
    retailer, ids = fetch_ids(retailer)
  
    if not ids:
        return

    
    for item in ids:
        offer_data = fetch_offer_data(item)
        if not offer_data:
            continue

        retailer_info = offer_data.get('retailer', {})
        store_info = fetch_store_data(retailer_info['id'])
        if not store_info:
            continue

        flat_data = {
            'retailer_name': retailer_info.get('name'),
            'retailer_id': retailer_info.get('id'),
            'offer_id': offer_data.get('id'),
            'article_name': offer_data.get('article', {}).get('name'),
            'market': offer_data.get('market'),
            'discount': offer_data.get('discount'),
            'city': store_info.get('city'),
            'street': store_info.get('street'),
            'zipCode': store_info.get('zipCode'),
            'lat': store_info['location'][0] if store_info.get('location') else None,
            'lng': store_info['location'][1] if store_info.get('location') else None,
            'gmapUrl': store_info.get('gmapUrl')
        }
        detailed_rows.append(flat_data)

    # if detailed_rows:
    #     save_csv(detailed_rows, BASE_PATH /
    #              f"{retailer.replace(' ', '_')}.csv")


with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(process_retailer, RETAILERS)

if detailed_rows:
        save_csv(detailed_rows, BASE_PATH /
                 f"retailers.csv")
