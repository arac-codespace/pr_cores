import json
import os
print("Running Create MSCL Json Script - Multiple")

# Change filenames, change core key to corresponding core id,
# change previous_primary_key_count with the max count of prev record...


CURR_DIR = os.path.dirname(os.path.realpath(__file__))

# input_file_name = "8GGC_MSCL.json"
input_folder_path = "MSCL_JSON_ORIG/"

# output_file_name = "8GGC_MSCL_FIXTURE.json"
output_folder_path = "MSCL_JSON_FIXTURE/"

directory = sorted(os.listdir(os.path.join(CURR_DIR, input_folder_path)))

print(directory)
core_foreign_key = 0
primary_key = 0

for file in directory:

    input_path = os.path.join(CURR_DIR, input_folder_path + file)

    output_path = os.path.join(CURR_DIR, output_folder_path + "FIXTURE_" + file)

    # LOAD JSON FILE
    mscl = json.load(open(input_path, 'r'))

    # NOTE! Core w/ ID: 15 (28GGC) doesn't have MSCL!
    # So skip core ID 15...
    if core_foreign_key == 14:
        core_foreign_key += 2
    else:
        core_foreign_key += 1

    # BUILD JSON STRUCTURE
    mscl_obj = []
    for item in mscl:

        if item["Depth_corrected"]:
            primary_key += 1
            mscl_obj.append({
                "model": "cores.mscl",
                "pk": primary_key,
                "fields": {
                    "core": core_foreign_key,
                    "den1": str(item['Den1']),
                    "ms1": str(item['MS1']),
                    "depth": str(item['Depth_corrected'])
                }
            })

    with open(output_path, 'w') as outfile:
        json.dump(mscl_obj, outfile, indent=4)
