import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiClock, FiUsers, FiHeart, FiBookmark } from 'react-icons/fi';
import { BiDish } from 'react-icons/bi';
import toast from 'react-hot-toast';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample recipes data - replace with API call or Firebase data
  const sampleRecipes = [
    {
      id: 1,
      name: 'Vegetable Stir Fry',
      category: 'lunch',
      difficulty: 'easy',
      time: 20,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
      ingredients: ['vegetables', 'soy sauce', 'garlic', 'oil'],
      expiringIngredients: ['vegetables'],
      description: 'Quick and healthy stir fry with fresh vegetables'
    },
    {
      id: 2,
      name: 'Chicken Curry',
      category: 'dinner',
      difficulty: 'medium',
      time: 45,
      servings: 6,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500',
      ingredients: ['chicken', 'curry powder', 'coconut milk', 'onions'],
      expiringIngredients: ['chicken'],
      description: 'Rich and flavorful chicken curry with aromatic spices'
    },
    {
      id: 3,
      name: 'Banana Pancakes',
      category: 'breakfast',
      difficulty: 'easy',
      time: 15,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500',
      ingredients: ['banana', 'eggs', 'flour', 'milk'],
      expiringIngredients: ['banana', 'milk'],
      description: 'Fluffy pancakes perfect for using overripe bananas'
    },
    {
      id: 4,
      name: 'Tomato Pasta',
      category: 'lunch',
      difficulty: 'easy',
      time: 25,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
      ingredients: ['pasta', 'tomatoes', 'garlic', 'basil'],
      expiringIngredients: ['tomatoes'],
      description: 'Classic pasta with fresh tomato sauce'
    },
    {
      id: 5,
      name: 'Beef Steak',
      category: 'dinner',
      difficulty: 'hard',
      time: 35,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
      ingredients: ['beef', 'butter', 'herbs', 'pepper'],
      expiringIngredients: ['beef'],
      description: 'Perfectly cooked steak with herb butter'
    },
    {
      id: 6,
      name: 'Fruit Smoothie',
      category: 'breakfast',
      difficulty: 'easy',
      time: 5,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500',
      ingredients: ['fruits', 'yogurt', 'honey', 'ice'],
      expiringIngredients: ['fruits', 'yogurt'],
      description: 'Refreshing smoothie to use up ripe fruits'
    },
    {
      id: 7,
      name: 'Fish Tacos',
      category: 'lunch',
      difficulty: 'medium',
      time: 30,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
      ingredients: ['fish', 'tortillas', 'cabbage', 'lime'],
      expiringIngredients: ['fish', 'cabbage'],
      description: 'Crispy fish tacos with fresh slaw'
    },
    {
      id: 8,
      name: 'Mushroom Risotto',
      category: 'dinner',
      difficulty: 'hard',
      time: 40,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1476124369491-c4843c81a37e?w=500',
      ingredients: ['rice', 'mushrooms', 'cheese', 'wine'],
      expiringIngredients: ['mushrooms'],
      description: 'Creamy Italian risotto with fresh mushrooms'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Recipes', icon: BiDish },
    { value: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { value: 'lunch', label: 'Lunch', icon: '🍱' },
    { value: 'dinner', label: 'Dinner', icon: '🍽️' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy', color: 'badge-success' },
    { value: 'medium', label: 'Medium', color: 'badge-warning' },
    { value: 'hard', label: 'Hard', color: 'badge-error' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecipes(sampleRecipes);
      setFilteredRecipes(sampleRecipes);
      setLoading(false);
    }, 1000);

    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setSavedRecipes(saved);
  }, []);

  useEffect(() => {
    let filtered = recipes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, recipes]);

  const toggleSaveRecipe = (recipeId) => {
    const saved = [...savedRecipes];
    const index = saved.indexOf(recipeId);
    
    if (index > -1) {
      saved.splice(index, 1);
      toast.success('Recipe removed from saved!', { icon: '💔' });
    } else {
      saved.push(recipeId);
      toast.success('Recipe saved!', { icon: '❤️' });
    }
    
    setSavedRecipes(saved);
    localStorage.setItem('savedRecipes', JSON.stringify(saved));
  };

  const RecipeCard = ({ recipe }) => {
    const isSaved = savedRecipes.includes(recipe.id);
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      >
        <figure className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {recipe.expiringIngredients.length > 0 && (
            <div className="absolute top-2 left-2 badge badge-error gap-1">
              <FiClock className="w-3 h-3" />
              Uses expiring items
            </div>
          )}
          <button
            onClick={() => toggleSaveRecipe(recipe.id)}
            className={`absolute top-2 right-2 btn btn-circle btn-sm ${isSaved ? 'btn-error' : 'btn-ghost bg-white/80'}`}
          >
            <FiHeart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </figure>
        
        <div className="card-body p-4">
          <h2 className="card-title text-lg">
            {recipe.name}
            <div className={`badge ${difficulties.find(d => d.value === recipe.difficulty)?.color || 'badge-ghost'}`}>
              {recipe.difficulty}
            </div>
          </h2>
          
          <p className="text-sm text-base-content/70">{recipe.description}</p>
          
          <div className="flex gap-4 mt-2 text-sm text-base-content/60">
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              <span>{recipe.time} min</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          
          {recipe.expiringIngredients.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-semibold text-error mb-1">Expiring ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {recipe.expiringIngredients.map((ing, idx) => (
                  <span key={idx} className="badge badge-error badge-sm">{ing}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-sm">
              {/* <FiChefHat className="w-4 h-4" /> */}
              View Recipe
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
          {/* <FiChefHat className="w-10 h-10 text-primary" /> */}
          Recipe Suggestions
        </h1>
        <p className="text-base-content/70">
          Cook delicious meals with your expiring ingredients
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-lg shadow-lg p-4 md:p-6 mb-6"
      >
        {/* Search */}
        <div className="form-control mb-4">
          <div className="input-group">
            <span className="bg-base-200">
              <FiSearch className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`btn btn-sm ${selectedCategory === cat.value ? 'btn-primary' : 'btn-ghost'}`}
              >
                {typeof cat.icon === 'string' ? cat.icon : <cat.icon className="w-4 h-4" />}
                <span className="ml-1">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filters */}
        <div>
          <p className="text-sm font-semibold mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setSelectedDifficulty(diff.value)}
                className={`btn btn-sm ${selectedDifficulty === diff.value ? 'btn-primary' : 'btn-ghost'}`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="stats shadow w-full mb-6"
      >
        <div className="stat">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-primary">{recipes.length}</div>
          <div className="stat-desc">Available to cook</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Filtered Results</div>
          <div className="stat-value text-secondary">{filteredRecipes.length}</div>
          <div className="stat-desc">Matching your filters</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Saved Recipes</div>
          <div className="stat-value text-accent">{savedRecipes.length}</div>
          <div className="stat-desc">
            <FiBookmark className="inline w-4 h-4" /> Your favorites
          </div>
        </div>
      </motion.div>

      {/* Recipes Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FiChefHat className="w-20 h-20 mx-auto text-base-content/30 mb-4" />
          <h3 className="text-2xl font-bold mb-2">No recipes found</h3>
          <p className="text-base-content/70">Try adjusting your filters or search terms</p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Recipes;