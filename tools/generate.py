#!/usr/bin/python3

import json
import os
import random
import uuid
from datetime import datetime


def get_profile_names():
    file = open("./tools/samples/profile-name.txt")
    lines = file.readlines()
    file.close()

    lines = [line.replace('\n', '') for line in lines]

    return lines


def get_restaurant_names():
    file = open("./tools/samples/restaurant-name.txt")
    lines = file.readlines()
    file.close()

    lines = [line.replace('\n', '') for line in lines]

    return lines


def get_street_names():
    file = open("./tools/samples/street-name.txt")
    lines = file.readlines()
    file.close()

    lines = [line.replace('\n', '') for line in lines]

    return lines


def get_postal_codes():
    file = open("./tools/samples/postal-code.txt")
    lines = file.readlines()
    file.close()

    lines = [line.replace('\n', '') for line in lines]

    return lines


def save_to_file(data, path):
    with open(path, 'w') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)
    return


def pictogram(number):
    data = {"id": str(uuid.uuid4()),
            "name": "Pictogram " + str(number),
            "image": "https://source.unsplash.com/random"}

    return data


def pictogram_list(length):
    data = []

    for i in range(1, length + 1):
        data.append(pictogram(i))

    return data


def ingredient(number, pictogram_data):
    data = {"id": str(uuid.uuid4()),
            "name": "Ingredient " + str(number),
            "image": "https://source.unsplash.com/random",
            "allergens": [],
            "diets": []}

    for i in range(1, random.randint(0, 5)):
        elem = random.choice(pictogram_data)
        if elem["id"] not in data["allergens"]:
            data["allergens"].append(elem["id"])

    for i in range(1, random.randint(2, 6)):
        elem = random.choice(pictogram_data)
        if elem["id"] not in data["diets"]:
            data["diets"].append(elem["id"])

    return data


def ingredient_list(length, pictogram_data):
    data = []

    for i in range(1, length + 1):
        data.append(ingredient(i, pictogram_data))

    return data


def sauce(number, ingredient_data):
    data = {"id": str(uuid.uuid4()),
            "name": "Sauce " + str(number),
            "ingredients": []}

    for i in range(1, random.randint(2, 4)):
        elem = random.choice(ingredient_data)
        if elem["id"] not in data["ingredients"]:
            data["ingredients"].append(elem["id"])

    return data


def sauce_list(length, ingredient_data):
    data = []

    for i in range(1, length + 1):
        data.append(sauce(i, ingredient_data))

    return data


def dish(number, ingredient_data, sauce_data):
    data = {"id": str(uuid.uuid4()),
            "name": "Dish " + str(number),
            "type": random.choice(["starter", "plate", "dessert"]),
            "description": "A generic description",
            "price": str(random.randint(5, 25)),
            "ingredients": [],
            "sauces": [],
            "is_adaptable": random.choice(["true", "false"])}

    for i in range(1, random.randint(2, 6)):
        elem = random.choice(ingredient_data)
        if elem["id"] not in data["ingredients"]:
            data["ingredients"].append(elem["id"])

    if random.randint(1, 2) == 1:
        elem = random.choice(sauce_data)
        data["sauces"].append(elem["id"])

    return data


def dish_list(length, ingredient_data, sauce_data):
    data = []

    for i in range(1, length + 1):
        data.append(dish(i, ingredient_data, sauce_data))

    return data


def menu(number, dish_data):
    data = {"id": str(uuid.uuid4()),
            "name": "Menu " + str(number),
            "price": str(random.randint(10, 50)),
            "dishes": []}

    for i in range(1, random.randint(2, 4)):
        elem = random.choice(dish_data)
        if elem["id"] not in data["dishes"]:
            data["dishes"].append(elem["id"])

    return data


def menu_list(length, dish_data):
    data = []

    for i in range(1, length + 1):
        data.append(menu(i, dish_data))

    return data


def card(number, dish_data, menu_data):
    data = {"id": str(uuid.uuid4()),
            "name": "Card " + str(number),
            "dishes": [],
            "menus": []}

    for i in range(1, random.randint(5, 10)):
        elem = random.choice(dish_data)
        if elem["id"] not in data["dishes"]:
            data["dishes"].append(elem["id"])

    for i in range(1, random.randint(2, 6)):
        elem = random.choice(menu_data)
        if elem["id"] not in data["menus"]:
            data["menus"].append(elem["id"])

    return data


def card_list(length, dish_data, menu_data):
    data = []

    for i in range(1, length + 1):
        data.append(card(i, dish_data, menu_data))

    return data


def restaurant(restaurant_name, street_name, postal_code, card_data, dish_data):
    longitude_float = random.randint(41000, 47000)
    latitude_float = random.randint(57000, 60000)

    data = {"id": str(uuid.uuid4()),
            "name": restaurant_name,
            "description": "A generic description",
            "image": "https://source.unsplash.com/random",
            "average_rate": str(random.randint(0, 6)),
            "average_price": str(random.randint(5, 30)),
            "address": {
                "street_number": str(random.randint(1, 200)),
                "street": street_name,
                "postal_code": postal_code,
                "city": "Toulouse",
                "country": "France",
            },
            "location": {
                "latitude": "43.{}".format(latitude_float),
                "longitude": "1.{}".format(longitude_float),
            },
            "phone": "01 02 03 04 05",
            "url": "https://example.com",
            "opening_time": [[], [], [], [], [], [], []],
            "current_card": "",
            "cards": [],
            "dishes": []}

    def generate_hour():
        hour = str(random.randint(0, 23))

        if len(hour) == 1:
            return "0" + hour
        else:
            return hour

    def generate_min():
        minutes = str(random.randint(0, 59))

        if len(minutes) == 1:
            return "0" + minutes
        else:
            return minutes

    for i in range(0, 7):
        from_hour = generate_hour() + ":" + generate_min()
        to_hour = generate_hour() + ":" + generate_min()

        if random.randint(0, 7) == 0:
            continue

        if int(from_hour.split(":")[0]) < int(to_hour.split(":")[0]):
            data["opening_time"][i].append({"from": from_hour, "to": to_hour})
        elif int(from_hour.split(":")[0]) > int(to_hour.split(":")[0]):
            data["opening_time"][i].append({"from": to_hour, "to": from_hour})
        else:
            if int(from_hour.split(":")[1]) < int(to_hour.split(":")[1]):
                data["opening_time"][i].append({"from": from_hour, "to": to_hour})
            elif int(from_hour.split(":")[1]) > int(to_hour.split(":")[1]):
                data["opening_time"][i].append({"from": to_hour, "to": from_hour})

    for i in range(1, random.randint(2, 6)):
        elem = random.choice(card_data)
        if elem["id"] not in data["cards"]:
            data["cards"].append(elem["id"])

    for i in range(1, random.randint(10, 50)):
        elem = random.choice(dish_data)
        if elem["id"] not in data["dishes"]:
            data["dishes"].append(elem["id"])

    data["current_card"] = random.choice(data["cards"])

    return data


def restaurant_list(length, restaurant_names, street_names, postal_codes, card_data, dish_data):
    data = []

    for i in range(1, length + 1):
        restaurant_name = random.choice(restaurant_names)
        street_name = random.choice(street_names)
        postal_code = random.choice(postal_codes)

        restaurant_names.remove(restaurant_name)
        street_names.remove(street_name)

        data.append(restaurant(restaurant_name, street_name, postal_code, card_data, dish_data))

    return data


def profile(name, restaurant_data):
    first_name, last_name = name.split(" ")

    data = {"id": str(uuid.uuid4()),
            "email": first_name.lower() + "." + last_name.lower() + "@example.com",
            "firstName": first_name,
            "lastName": last_name,
            "restaurant": random.choice(restaurant_data)["id"]}

    return data


def profile_list(length, profile_names, restaurant_data):
    data = []

    for i in range(1, length + 1):
        name = random.choice(profile_names)

        profile_names.remove(name)

        data.append(profile(name, restaurant_data))

    return data


def main():
    random.seed(datetime.now())

    profile_names = get_profile_names()
    restaurant_names = get_restaurant_names()
    street_names = get_street_names()
    postal_codes = get_postal_codes()

    if os.path.exists("./data/pictograms/second-data.json"):
        file = open("./data/pictograms/second-data.json")
        pictogram_data = json.load(file)
        file.close()
    else:
        pictogram_data = pictogram_list(random.randint(5, 100))
        save_to_file(pictogram_data, "./data/pictograms/data.json")

    if os.path.exists("./data/ingredients/second-data.json"):
        file = open("./data/ingredients/second-data.json")
        ingredient_data = json.load(file)
        file.close()
    else:
        ingredient_data = ingredient_list(random.randint(5, 100), pictogram_data)
        save_to_file(ingredient_data, "./data/ingredients/data.json")

    if os.path.exists("./data/sauces/second-data.json"):
        file = open("./data/sauces/second-data.json")
        sauce_data = json.load(file)
        file.close()
    else:
        sauce_data = sauce_list(random.randint(5, 100), ingredient_data)
        save_to_file(sauce_data, "./data/sauces/data.json")

    if os.path.exists("./data/dishes/second-data.json"):
        file = open("./data/dishes/second-data.json")
        dish_data = json.load(file)
        file.close()
    else:
        dish_data = dish_list(random.randint(5, 100), ingredient_data, sauce_data)
        save_to_file(dish_data, "./data/dishes/data.json")

    if os.path.exists("./data/menus/second-data.json"):
        file = open("./data/menus/second-data.json")
        menu_data = json.load(file)
        file.close()
    else:
        menu_data = menu_list(random.randint(5, 100), dish_data)
        save_to_file(menu_data, "./data/menus/data.json")

    if os.path.exists("./data/cards/second-data.json"):
        file = open("./data/cards/second-data.json")
        card_data = json.load(file)
        file.close()
    else:
        card_data = card_list(random.randint(5, 100), dish_data, menu_data)
        save_to_file(card_data, "./data/cards/data.json")

    restaurant_data = restaurant_list(random.randint(5, 100), restaurant_names, street_names, postal_codes, card_data,
                                      dish_data)
    save_to_file(restaurant_data, "./data/restaurants/data.json")

    profile_data = profile_list(random.randint(5, 100), profile_names, restaurant_data)
    save_to_file(profile_data, "./data/profiles/data.json")

    return


if __name__ == '__main__':
    main()
