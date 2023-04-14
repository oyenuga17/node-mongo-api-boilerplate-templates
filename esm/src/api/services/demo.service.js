import { DemoModel as Demo } from "../models/demo.model";

/*======================
  operations for /demo
=======================*/

const getDemoItemsService = async () => {
  const query = await Demo.find().select("_id name age").exec();
  return query;
};

const createDemoItemService = async (requestBody) => {
  let demo = new Demo({
    name: requestBody.name,
    age: requestBody.age,
  });

  const save = await demo.save();
  return save;
};


/*=============================
  operations for /demo/demoId
==============================*/

const getOneDemoItemService = async (paramsId) => {
  const query = Demo.findById(paramsId).select("_id name age").exec();
  return query;
};

const deleteDemoItemService = async (paramsId) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};

const partialUpdateDemoItemService = async (paramsId, requestBody) => {
  const updateOps = {};
  for (const ops of requestBody) {
    updateOps[ops.propName] = ops.value;
  }
  const query = await Demo.updateOne({ _id: paramsId }, { $set: updateOps }).exec();
  return query;
}

const fullUpdateDemoItemService = async (paramsId, requestBody) => {
  let resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(paramsId, { $set: resetItem }, { new: true }).exec();
  return query;
}



export {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  partialUpdateDemoItemService,
  fullUpdateDemoItemService,
};
