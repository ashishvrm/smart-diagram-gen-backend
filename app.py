# backend/app.py
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from stability_sdk import client
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

stability_api = client.StabilityInference(
    key=os.getenv('STABILITY_API_KEY'),
    verbose=True,
)

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('text', '')
    
    try:
        # Generate image using Stability AI
        response = stability_api.generate(
            prompt=prompt,
            steps=30,
            cfg_scale=7.0,
            width=512,
            height=512,
            samples=1,
            sampler=client.generation.SAMPLER_K_DPMPP_2M
        )

        for resp in response:
            for artifact in resp.artifacts:
                if artifact.type == client.generation.ARTIFACT_IMAGE:
                    img = io.BytesIO(artifact.binary)
                    return send_file(img, mimetype='image/png')

        return jsonify({'error': 'Failed to generate image'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
