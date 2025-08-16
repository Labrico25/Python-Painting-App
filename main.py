from flask import Flask, render_template, request

import requests

from bs4 import BeautifulSoup

def nth (iterator, n, f):
    idx = n
    while idx != 0:
        next(iterator)
        idx -= 1
    return f(next(iterator))


html = requests.get('https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F')

soup = BeautifulSoup(html.text, 'html.parser')

tables = soup.find_all("table")

target_table = tables[0]


target_tbody = target_table.find_all("tbody")[0]


trs = target_tbody.find_all('tr')


target_tds = [nth(tr.children, 5, (lambda x: x.text)) for tr in trs]


remove_newlines = [s.replace('\n', '') for s in target_tds]


list_of_colors = []

for candidate in remove_newlines:
    if candidate.startswith('#'):
        list_of_colors.append(candidate)

clients = {}


app = Flask(__name__)


def push_to_clients_if_not (ip_address):
    if ip_address not in clients:
        clients[ip_address] = {'canvas': []}
        
        

@app.route('/destroy', methods=['POST'])
def destroy_endpoint():
    json = request.get_json()
    
    if json.get('value', False):
        
        ip_address = request.remote_addr
        
        clients[ip_address]['canvas'] = []
        
        return {}, 200
    
    return {}, 500


@app.route('/save', methods=['POST'])
def save_endpoint():
    
    data = request.get_data(as_text=True)
    
    ip_address = request.remote_addr
    
    if ip_address in clients:
        
        clients[ip_address]['canvas'] = [data]
        
        return {}, 200
    
    
def load (ip_address):
    
    data = clients[ip_address]['canvas']
    
    if not data:
        
        return '\'\''
    
    else:
        
        return ('\'' + data[0] + '\'')
        


@app.route('/')
def page ():
    ip_address = request.remote_addr
    
    push_to_clients_if_not(ip_address)
    
    maybe_dataURL = load(ip_address)

    return render_template('index.html', list_of_colors=list_of_colors, maybe_dataURL=maybe_dataURL)


if __name__ == '__main__':
    app.run()
 