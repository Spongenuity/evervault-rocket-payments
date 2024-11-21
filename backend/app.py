from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from datetime import datetime

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    API_KEY = os.getenv('EVERVAULT_API_KEY')
    RELAY_URL = "https://eob1eil2vw3o75d-m-pipedream-net-app-b1d7676d1516.relay.evervault.app"

    @app.route('/api/process-payment', methods=['POST'])
    def process_payment():
        try:
            payment_data = request.json
            print(f"Processing payment at {datetime.utcnow().isoformat()}")
            
            response = requests.post(
                RELAY_URL,
                json=payment_data,
            )

            if response.status_code == 200:
                return jsonify({
                    "success": True,
                    "transaction_id": f"tx_{os.urandom(8).hex()}",
                    "message": "Payment processed successfully"
                })
            else:
                return jsonify({
                    "success": False,
                    "error": f"Payment processing failed: {response.text}"
                }), response.status_code

        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
