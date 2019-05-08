const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },
  
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ... args };

    // remove the id from the updates
    delete updates.id;

    // run the update method
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      },
    }, info);
  }

  // createDog(parent, args, context, info) {
  //   // create a dog or whatever
  //   global.dogs = global.dogs || [];
  //   const newDog = { name: args.name };
  //   global.dogs.push(newDog);
  //   return newDog;
  // }
};

module.exports = mutations;
