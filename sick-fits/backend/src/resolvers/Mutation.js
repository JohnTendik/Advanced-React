const mutations = {
  createDog(parent, args, context, info) {
    // create a dog or whatever
    global.dogs = global.dogs || [];
    const newDog = { name: args.name };
    global.dogs.push(newDog);
    return newDog;
  }
};

module.exports = mutations;
