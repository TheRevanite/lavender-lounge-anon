from flask import render_template, send_from_directory
from . import create_app

app = create_app()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)