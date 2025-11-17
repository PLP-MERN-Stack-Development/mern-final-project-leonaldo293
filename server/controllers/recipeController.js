import Recipe from '../models/Recipe.js';

// Get all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('autor', 'nome');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single recipe
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('autor', 'nome');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create recipe (protected)
export const createRecipe = async (req, res) => {
  try {
    const { titulo, descricao, ingredientes, instrucoes, tempoPreparo, porcoes, imagem } = req.body;

    // Validation
    if (!titulo || !descricao || !ingredientes || !instrucoes) {
      return res.status(400).json({ message: 'Título, descrição, ingredientes e instruções são obrigatórios' });
    }

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      return res.status(400).json({ message: 'Ingredientes deve ser um array não vazio' });
    }

    const recipe = await Recipe.create({
      titulo,
      descricao,
      ingredientes,
      instrucoes,
      tempoPreparo: tempoPreparo || 0,
      porcoes: porcoes || 1,
      imagem,
      autor: req.user._id
    });
    await recipe.populate('autor', 'nome');
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update recipe (protected, only author or admin)
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receita não encontrada' });

    // Allow admin to update any recipe, or author to update their own
    if (req.user.role !== 'admin' && recipe.autor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const { titulo, descricao, ingredientes, instrucoes, tempoPreparo, porcoes, imagem } = req.body;

    // Validation
    if (ingredientes && (!Array.isArray(ingredientes) || ingredientes.length === 0)) {
      return res.status(400).json({ message: 'Ingredientes deve ser um array não vazio' });
    }

    recipe.titulo = titulo || recipe.titulo;
    recipe.descricao = descricao || recipe.descricao;
    recipe.ingredientes = ingredientes || recipe.ingredientes;
    recipe.instrucoes = instrucoes || recipe.instrucoes;
    recipe.tempoPreparo = tempoPreparo !== undefined ? tempoPreparo : recipe.tempoPreparo;
    recipe.porcoes = porcoes !== undefined ? porcoes : recipe.porcoes;
    recipe.imagem = imagem !== undefined ? imagem : recipe.imagem;

    await recipe.save();
    await recipe.populate('autor', 'nome');
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete recipe (protected, only author or admin)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receita não encontrada' });

    // Allow admin to delete any recipe, or author to delete their own
    if (req.user.role !== 'admin' && recipe.autor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Receita deletada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
