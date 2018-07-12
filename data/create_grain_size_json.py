import json
import os
print("Running Create Grain Size Json Script")


CURR_DIR = os.path.dirname(os.path.realpath(__file__))

input_file_name = "2008PR_grainsize.json"
io_folder_path = "grain_size/"

output_file_name = "app_grain_size.json"
# output_folder_path = "MSCL_JSON_FIXTURE/"

# core_foreign_key = 0
primary_key = 0


input_path = os.path.join(CURR_DIR, io_folder_path + input_file_name)

output_path = os.path.join(CURR_DIR, io_folder_path + output_file_name)

# LOAD JSON FILE
grain_size = json.load(open(input_path, 'r'))



# The homebrew python switcher...
def get_core_id_from_name(input_name):
    # field_no: id
    switcher = {
        "SJ8-5GGC": 1,
        "SJ8-7GGC": 2,
        "SJ8-8GGC": 3,
        "SJ8-9GGC": 4,
        "SJ8-10GGC": 5,
        "SJ8-12GGC": 6,
        "SJ8-13GGC": 7,
        "SJ8-17GGC": 8,
        "SJ8-18GGC": 9,
        "SJ8-20GGC": 10,
        "SJ8-21GGC": 11,
        "SJ8-22GGC": 12,
        "SJ8-23GGC": 13,
        "SJ8-24GGC": 14,
        "SJ8-28GGC": 15,
        "SJ8-31GGC": 16,
        "SJ8-33GGC": 17,
        "SJ8-34GGC": 18,
        "SJ8-38GGC": 19,
        "SJ8-40GGC": 20
    }

    for field_no in switcher:
        # print(field_no)
        if field_no in input_name:
            return switcher.get(field_no, "nothing")


# BUILD JSON STRUCTURE
grain_size_obj = []
for item in grain_size:
    print(get_core_id_from_name(item['FIELD_NO']))
    primary_key += 1
    grain_size_obj.append({
        "model": "cores.grainsize",
        "pk": primary_key,
        "fields": {
            "core": get_core_id_from_name(item['FIELD_NO']),
            "field_no": item['FIELD_NO'],
            "depth": str(item['T_DEPTH']),
            "b_depth": str(item['B_DEPTH']),
            "gravel_pct": str(item['GRAVEL_PCT']),
            "clay_pct": str(item['CLAY_PCT']),
            "silt_pct": str(item['SILT_PCT']),
            "sand_pct": str(item['SAND_PCT']),
            "mean_grain_size": str(item['MEAN'])
        }
    })

print(grain_size_obj)

with open(output_path, 'w') as outfile:
    json.dump(grain_size_obj, outfile, indent=4)
