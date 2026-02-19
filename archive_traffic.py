"""
Archive GitHub repository traffic data (views) beyond the 14-day API limit.
Run via GitHub Actions daily; merges new data into traffic_history.csv and
generates a line chart (traffic_chart.png).
Requires: GH_TOKEN secret (PAT with repo scope), GITHUB_REPOSITORY (set by Actions).
"""
import os
import requests
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

TOKEN = os.getenv('GH_TOKEN')
REPO = os.getenv('GITHUB_REPOSITORY')
HEADERS = {
    'Authorization': f'token {TOKEN}',
    'Accept': 'application/vnd.github+json',
}

def fetch_and_save_data():
    if not TOKEN or not REPO:
        print("Error: GH_TOKEN and GITHUB_REPOSITORY must be set.")
        return None

    url = f"https://api.github.com/repos/{REPO}/traffic/views"
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        return None

    data = response.json()
    views = data.get('views', [])
    if not views:
        print("No new traffic data returned.")
        return None

    df_new = pd.DataFrame(views)
    filename = 'traffic_history.csv'

    if os.path.exists(filename):
        df_old = pd.read_csv(filename)
        df_combined = pd.concat([df_old, df_new]).drop_duplicates(subset=['timestamp'])
        df_combined = df_combined.sort_values('timestamp').reset_index(drop=True)
        df_combined.to_csv(filename, index=False)
        print(f"Updated {filename} with new data.")
    else:
        df_new.to_csv(filename, index=False)
        print(f"Created new {filename}.")

    return filename

def generate_chart(csv_file):
    df = pd.read_csv(csv_file)
    df['timestamp'] = pd.to_datetime(df['timestamp']).dt.date
    df = df.sort_values('timestamp')

    plt.figure(figsize=(10, 5))
    plt.plot(df['timestamp'], df['count'], label='Total Views', marker='o', color='#0366d6', markersize=4)
    plt.plot(df['timestamp'], df['uniques'], label='Unique Visitors', marker='s', color='#28a745', markersize=4)

    plt.title(f"Repository Traffic: {REPO}")
    plt.xlabel("Date")
    plt.ylabel("Count")
    plt.xticks(rotation=45)
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.6)
    plt.tight_layout()

    plt.savefig('traffic_chart.png', dpi=100)
    plt.close()
    print("Chart saved as traffic_chart.png")

if __name__ == "__main__":
    csv_path = fetch_and_save_data()
    if csv_path and os.path.exists(csv_path):
        generate_chart(csv_path)
