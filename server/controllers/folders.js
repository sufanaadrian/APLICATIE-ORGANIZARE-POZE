import Folder from "../models/Folder.js";

export const createFolderFunc = async (req, res) => {
  try {
    const { userId } = req.body;
    const { folderName } = req.body;
    const folder = new Folder({ userId, folderName });
    await folder.save();
    const fld = await Folder.find();
    res.status(201).json(fld);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating folder." });
  }
};

export const getFoldersFunc = async (req, res) => {
  try {
    const folders = await Folder.find({ userId });
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching folders." });
  }
};

export const deleteFolderFunc = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!folder) {
      return res.status(404).send({ message: "Folder not found." });
    }

    res.send(folder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting folder." });
  }
};
