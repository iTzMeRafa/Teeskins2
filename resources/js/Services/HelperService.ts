export class HelperService {

  /**
   * Groups an array of object by a given key
   * example:
   *  - ungrouped array: const pets = [{type:"Dog", name:"Spot"}, {type:"Cat", name:"Tiger"}, {type:"Dog", name:"Rover"}];
   *  - call: const grouped = groupArrayOfObjectsByKey(pets, pet => pet.type);
   *  - get: grouped.get("Dog"));
   *  - result: [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
   * @param list
   * @param keyGetter
   */
  public groupArrayOfObjectsByKey(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

}
