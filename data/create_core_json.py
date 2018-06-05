import json
import os
print("Running Create Core Json Script")


CURR_DIR = os.path.dirname(os.path.realpath(__file__))

print(CURR_DIR)

cores_summary_path = os.path.join(CURR_DIR, "cores_summary.json")

print(cores_summary_path)

cores = json.load(open(cores_summary_path, 'r'))

core_obj = []

for core in cores:
    core_obj.append({
        "sample_no": core["core_no"],
        "lat": core["lat"],
        "lng": core["lng"],
    })

