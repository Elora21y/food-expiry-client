import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiClock,
  FiUsers,
  FiHeart,
  FiBookmark,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { PiChefHatLight } from "react-icons/pi";
import { BiDish } from "react-icons/bi";
import toast from "react-hot-toast";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample recipes data with full details
  const sampleRecipes = [
    {
      id: 1,
      name: "Vegetable Stir Fry",
      category: "lunch",
      difficulty: "easy",
      time: 20,
      servings: 4,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      ingredients: ["vegetables", "soy sauce", "garlic", "oil"],
      expiringIngredients: ["vegetables"],
      description: "Quick and healthy stir fry with fresh vegetables",
      fullIngredients: [
        { name: "Mixed vegetables", amount: "500g", expiring: true },
        { name: "Soy sauce", amount: "3 tbsp", expiring: false },
        { name: "Garlic (minced)", amount: "3 cloves", expiring: false },
        { name: "Vegetable oil", amount: "2 tbsp", expiring: false },
        { name: "Ginger", amount: "1 inch", expiring: false },
        { name: "Salt", amount: "to taste", expiring: false },
      ],
      instructions: [
        "Heat oil in a large wok or pan over high heat",
        "Add minced garlic and ginger, stir fry for 30 seconds",
        "Add mixed vegetables and stir fry for 5-7 minutes",
        "Pour soy sauce and mix well",
        "Cook for another 2-3 minutes until vegetables are tender-crisp",
        "Season with salt if needed and serve hot",
      ],
      nutrition: {
        calories: 120,
        protein: "4g",
        carbs: "15g",
        fat: "6g",
      },
      tips: [
        "Cut all vegetables to similar size for even cooking",
        "Keep the heat high for best stir-fry results",
        "Don't overcrowd the pan",
      ],
    },
    {
      id: 2,
      name: "Chicken Curry",
      category: "dinner",
      difficulty: "medium",
      time: 45,
      servings: 6,
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800",
      ingredients: ["chicken", "curry powder", "coconut milk", "onions"],
      expiringIngredients: ["chicken"],
      description: "Rich and flavorful chicken curry with aromatic spices",
      fullIngredients: [
        { name: "Chicken breast", amount: "800g", expiring: true },
        { name: "Curry powder", amount: "3 tbsp", expiring: false },
        { name: "Coconut milk", amount: "400ml", expiring: false },
        { name: "Onions (sliced)", amount: "2 large", expiring: false },
        { name: "Tomatoes", amount: "2 medium", expiring: false },
        { name: "Garlic paste", amount: "1 tbsp", expiring: false },
        { name: "Ginger paste", amount: "1 tbsp", expiring: false },
        { name: "Salt", amount: "to taste", expiring: false },
      ],
      instructions: [
        "Cut chicken into bite-sized pieces",
        "Heat oil in a large pot and sauté onions until golden",
        "Add garlic and ginger paste, cook for 1 minute",
        "Add curry powder and cook for 30 seconds",
        "Add chicken pieces and cook until white on all sides",
        "Add chopped tomatoes and cook until soft",
        "Pour coconut milk and simmer for 20-25 minutes",
        "Season with salt and garnish with cilantro",
      ],
      nutrition: {
        calories: 320,
        protein: "28g",
        carbs: "12g",
        fat: "18g",
      },
      tips: [
        "Marinate chicken for 30 minutes for better flavor",
        "Use full-fat coconut milk for creamier curry",
        "Serve with rice or naan bread",
      ],
    },
    {
      id: 3,
      name: "Banana Pancakes",
      category: "breakfast",
      difficulty: "easy",
      time: 15,
      servings: 2,
      image:
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
      ingredients: ["banana", "eggs", "flour", "milk"],
      expiringIngredients: ["banana", "milk"],
      description: "Fluffy pancakes perfect for using overripe bananas",
      fullIngredients: [
        { name: "Ripe bananas", amount: "2 large", expiring: true },
        { name: "Eggs", amount: "2", expiring: false },
        { name: "All-purpose flour", amount: "1 cup", expiring: false },
        { name: "Milk", amount: "1/2 cup", expiring: true },
        { name: "Baking powder", amount: "1 tsp", expiring: false },
        { name: "Sugar", amount: "2 tbsp", expiring: false },
        { name: "Butter", amount: "for cooking", expiring: false },
      ],
      instructions: [
        "Mash bananas in a large bowl",
        "Beat in eggs and milk until smooth",
        "Mix flour, baking powder, and sugar in another bowl",
        "Combine wet and dry ingredients, don't overmix",
        "Heat butter in a pan over medium heat",
        "Pour 1/4 cup batter for each pancake",
        "Cook until bubbles form, then flip and cook other side",
        "Serve with maple syrup and fresh fruits",
      ],
      nutrition: {
        calories: 280,
        protein: "10g",
        carbs: "45g",
        fat: "7g",
      },
      tips: [
        "The riper the banana, the sweeter the pancakes",
        "Don't press down on pancakes while cooking",
        "Keep cooked pancakes warm in oven",
      ],
    },
    {
      id: 4,
      name: "Tomato Pasta",
      category: "lunch",
      difficulty: "easy",
      time: 25,
      servings: 4,
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
      ingredients: ["pasta", "tomatoes", "garlic", "basil"],
      expiringIngredients: ["tomatoes"],
      description: "Classic pasta with fresh tomato sauce",
      fullIngredients: [
        { name: "Spaghetti", amount: "400g", expiring: false },
        { name: "Fresh tomatoes", amount: "6 large", expiring: true },
        { name: "Garlic cloves", amount: "4", expiring: false },
        { name: "Fresh basil", amount: "1 bunch", expiring: false },
        { name: "Olive oil", amount: "3 tbsp", expiring: false },
        { name: "Parmesan cheese", amount: "50g", expiring: false },
        { name: "Salt & pepper", amount: "to taste", expiring: false },
      ],
      instructions: [
        "Boil water and cook pasta according to package directions",
        "Meanwhile, dice tomatoes and mince garlic",
        "Heat olive oil in a pan and sauté garlic until fragrant",
        "Add tomatoes and cook until they break down (10 minutes)",
        "Season with salt and pepper",
        "Drain pasta and add to tomato sauce",
        "Toss well and add fresh basil leaves",
        "Serve with grated parmesan cheese",
      ],
      nutrition: {
        calories: 380,
        protein: "12g",
        carbs: "68g",
        fat: "8g",
      },
      tips: [
        "Use ripe tomatoes for best flavor",
        "Reserve some pasta water to adjust sauce consistency",
        "Add red pepper flakes for a spicy kick",
      ],
    },
    {
      id: 5,
      name: "Beef Steak",
      category: "dinner",
      difficulty: "hard",
      time: 35,
      servings: 2,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
      ingredients: ["beef", "butter", "herbs", "pepper"],
      expiringIngredients: ["beef"],
      description: "Perfectly cooked steak with herb butter",
      fullIngredients: [
        {
          name: "Beef ribeye steak",
          amount: "2 pieces (300g each)",
          expiring: true,
        },
        { name: "Butter", amount: "50g", expiring: false },
        { name: "Fresh rosemary", amount: "2 sprigs", expiring: false },
        { name: "Fresh thyme", amount: "2 sprigs", expiring: false },
        { name: "Garlic", amount: "2 cloves", expiring: false },
        { name: "Black pepper", amount: "1 tsp", expiring: false },
        { name: "Salt", amount: "1 tsp", expiring: false },
      ],
      instructions: [
        "Remove steaks from fridge 30 minutes before cooking",
        "Pat dry and season generously with salt and pepper",
        "Heat a heavy pan until smoking hot",
        "Add steaks and cook for 3-4 minutes without moving",
        "Flip and cook for another 3-4 minutes",
        "Add butter, garlic, and herbs to the pan",
        "Baste steaks with melted butter for 1-2 minutes",
        "Rest steaks for 5 minutes before serving",
      ],
      nutrition: {
        calories: 580,
        protein: "52g",
        carbs: "2g",
        fat: "42g",
      },
      tips: [
        "Don't move the steak while cooking for a good crust",
        "Use a meat thermometer: 54°C for medium-rare",
        "Let it rest to redistribute the juices",
      ],
    },
    {
      id: 6,
      name: "Fruit Smoothie",
      category: "breakfast",
      difficulty: "easy",
      time: 5,
      servings: 2,
      image:
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800",
      ingredients: ["fruits", "yogurt", "honey", "ice"],
      expiringIngredients: ["fruits", "yogurt"],
      description: "Refreshing smoothie to use up ripe fruits",
      fullIngredients: [
        {
          name: "Mixed fruits (banana, berries, mango)",
          amount: "300g",
          expiring: true,
        },
        { name: "Greek yogurt", amount: "200g", expiring: true },
        { name: "Honey", amount: "2 tbsp", expiring: false },
        { name: "Ice cubes", amount: "1 cup", expiring: false },
        { name: "Milk or juice", amount: "100ml", expiring: false },
      ],
      instructions: [
        "Add all fruits to the blender",
        "Add yogurt and honey",
        "Pour in milk or juice",
        "Add ice cubes",
        "Blend on high speed until smooth",
        "Pour into glasses and serve immediately",
      ],
      nutrition: {
        calories: 180,
        protein: "8g",
        carbs: "35g",
        fat: "2g",
      },
      tips: [
        "Freeze ripe fruits for a thicker smoothie",
        "Add spinach for extra nutrients without changing taste",
        "Adjust sweetness with more or less honey",
      ],
    },
    {
      id: 7,
      name: "Fish Tacos",
      category: "lunch",
      difficulty: "medium",
      time: 30,
      servings: 4,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
      ingredients: ["fish", "tortillas", "cabbage", "lime"],
      expiringIngredients: ["fish", "cabbage"],
      description: "Crispy fish tacos with fresh slaw",
      fullIngredients: [
        { name: "White fish fillets", amount: "500g", expiring: true },
        { name: "Corn tortillas", amount: "8 pieces", expiring: false },
        { name: "Cabbage (shredded)", amount: "2 cups", expiring: true },
        { name: "Lime", amount: "2", expiring: false },
        { name: "Sour cream", amount: "1/2 cup", expiring: false },
        { name: "Flour", amount: "1/2 cup", expiring: false },
        {
          name: "Spices (paprika, cumin)",
          amount: "2 tsp each",
          expiring: false,
        },
      ],
      instructions: [
        "Cut fish into strips and season with spices",
        "Coat fish in flour and shake off excess",
        "Fry fish in hot oil until golden and crispy",
        "Mix cabbage with lime juice and sour cream for slaw",
        "Warm tortillas in a dry pan",
        "Assemble tacos with fish and slaw",
        "Top with extra lime juice and cilantro",
        "Serve immediately while fish is crispy",
      ],
      nutrition: {
        calories: 340,
        protein: "28g",
        carbs: "32g",
        fat: "12g",
      },
      tips: [
        "Use tilapia or cod for best results",
        "Don't overcrowd the pan when frying",
        "Add hot sauce for extra kick",
      ],
    },
    {
      id: 8,
      name: "Mushroom Risotto",
      category: "dinner",
      difficulty: "hard",
      time: 40,
      servings: 4,
      image:
        "https://images.unsplash.com/photo-1476124369491-c4843c81a37e?w=800",
      ingredients: ["rice", "mushrooms", "cheese", "wine"],
      expiringIngredients: ["mushrooms"],
      description: "Creamy Italian risotto with fresh mushrooms",
      fullIngredients: [
        { name: "Arborio rice", amount: "300g", expiring: false },
        { name: "Fresh mushrooms", amount: "400g", expiring: true },
        { name: "Parmesan cheese", amount: "100g", expiring: false },
        { name: "White wine", amount: "150ml", expiring: false },
        { name: "Vegetable stock", amount: "1 liter", expiring: false },
        { name: "Onion", amount: "1 small", expiring: false },
        { name: "Butter", amount: "50g", expiring: false },
        { name: "Olive oil", amount: "2 tbsp", expiring: false },
      ],
      instructions: [
        "Heat stock in a separate pot and keep warm",
        "Sauté sliced mushrooms in butter until golden, set aside",
        "In the same pan, cook chopped onion until soft",
        "Add rice and toast for 2 minutes",
        "Pour in wine and stir until absorbed",
        "Add stock one ladle at a time, stirring constantly",
        "Continue for 18-20 minutes until rice is creamy",
        "Stir in mushrooms, butter, and parmesan",
        "Season and serve immediately",
      ],
      nutrition: {
        calories: 420,
        protein: "14g",
        carbs: "62g",
        fat: "14g",
      },
      tips: [
        "Stir frequently but not constantly",
        "Rice should be al dente, not mushy",
        "Serve immediately as risotto waits for no one",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Recipes", icon: BiDish },
    { value: "breakfast", label: "Breakfast", icon: "🍳" },
    { value: "lunch", label: "Lunch", icon: "🍱" },
    { value: "dinner", label: "Dinner", icon: "🍽️" },
  ];

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "easy", label: "Easy", color: "badge-success" },
    { value: "medium", label: "Medium", color: "badge-warning" },
    { value: "hard", label: "Hard", color: "badge-error" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setRecipes(sampleRecipes);
      setFilteredRecipes(sampleRecipes);
      setLoading(false);
    }, 1000);

    const saved = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    setSavedRecipes(saved);
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === selectedDifficulty
      );
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, recipes]);

  const toggleSaveRecipe = (recipeId) => {
    const saved = [...savedRecipes];
    const index = saved.indexOf(recipeId);

    if (index > -1) {
      saved.splice(index, 1);
      toast.success("Recipe removed from saved!");
    } else {
      saved.push(recipeId);
      toast.success("Recipe saved!", { icon: "❤️" });
    }

    setSavedRecipes(saved);
    localStorage.setItem("savedRecipes", JSON.stringify(saved));
  };

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedRecipe(null), 300);
  };

  const RecipeDetailsModal = ({ recipe }) => {
    if (!recipe) return null;

    return (
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 "
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-base-100 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-3xl mx-auto min-h-screen lg:-mt-12"
            >
              {/* Header with Image */}
              <div className="relative h-48 md:h-64 xl:h-80">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 btn btn-soft btn-error btn-circle"
                >
                  <FiX className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {recipe.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className={`badge text-white ${
                        difficulties.find((d) => d.value === recipe.difficulty)
                          ?.color || "badge-ghost"
                      }`}
                    >
                      {recipe.difficulty}
                    </div>
                    <div className="badge badge-ghost">
                      <FiClock className="w-3 h-3 mr-1" />
                      {recipe.time} min
                    </div>
                    <div className="badge badge-ghost">
                      <FiUsers className="w-3 h-3 mr-1" />
                      {recipe.servings} servings
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Description */}
                  <p className="text-lg text-base-content/80 mb-6">
                    {recipe.description}
                  </p>

                  {/* Expiring Alert */}
                  {recipe.expiringIngredients.length > 0 && (
                    <div className="alert alert-warning mb-6">
                      <FiAlertCircle className="w-5 h-5" />
                      <div>
                        <h3 className="font-bold">
                          Uses Expiring Ingredients!
                        </h3>
                        <div className="text-sm flex flex-wrap gap-2 mt-1">
                          {recipe.expiringIngredients.map((ing, idx) => (
                            <span
                              key={idx}
                              className="badge badge-warning badge-sm font-bold"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ingredients */}
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-xl mb-4">
                          <FiCheckCircle className="text-primary" />
                          Ingredients
                        </h3>
                        <ul className="space-y-2">
                          {recipe.fullIngredients.map((ing, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 ${
                                ing.expiring ? "text-error font-semibold" : ""
                              }`}
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>
                                <strong>{ing.amount}</strong> {ing.name}
                                {ing.expiring && (
                                  <span className="badge badge-error badge-xs ml-2 text-gray-100">
                                    expiring
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Nutrition */}
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-xl mb-4">
                          Nutrition (per serving)
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {recipe.nutrition.calories && (
                            <div className="stat bg-base-100 rounded-lg p-3">
                              <div className="stat-title text-xs">Calories</div>
                              <div className="stat-value text-2xl text-primary">
                                {recipe.nutrition.calories}
                              </div>
                            </div>
                          )}
                          {recipe.nutrition.protein && (
                            <div className="stat bg-base-100 rounded-lg p-3">
                              <div className="stat-title text-xs">Protein</div>
                              <div className="stat-value text-2xl text-secondary">
                                {recipe.nutrition.protein}
                              </div>
                            </div>
                          )}
                          {recipe.nutrition.carbs && (
                            <div className="stat bg-base-100 rounded-lg p-3">
                              <div className="stat-title text-xs">Carbs</div>
                              <div className="stat-value text-2xl text-accent">
                                {recipe.nutrition.carbs}
                              </div>
                            </div>
                          )}
                          {recipe.nutrition.fat && (
                            <div className="stat bg-base-100 rounded-lg p-3">
                              <div className="stat-title text-xs">Fat</div>
                              <div className="stat-value text-2xl text-warning">
                                {recipe.nutrition.fat}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="card bg-base-200 mt-6">
                    <div className="card-body">
                      <h3 className="card-title text-xl mb-4">
                        <PiChefHatLight className="text-primary" />
                        Instructions
                      </h3>
                      <ol className="space-y-4">
                        {recipe.instructions.map((step, idx) => (
                          <li key={idx} className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <span className="flex-1 pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 my-6">
                    <div className="card-body">
                      <h3 className="card-title text-xl mb-4">
                        {" "}
                        <MdOutlineTipsAndUpdates
                          className="text-yellow-500"
                          size={22}
                        />{" "}
                        Pro Tips
                      </h3>
                      <ul className="space-y-2">
                        {recipe.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const RecipeCard = ({ recipe }) => {
    const isSaved = savedRecipes.includes(recipe.id);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      >
        <figure className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* {recipe.expiringIngredients.length > 0 && (
            <div className="absolute top-2 left-2 badge badge-error gap-1">
              <FiClock className="w-3 h-3" />
              Uses expiring items
            </div>
          )} */}
          <button
            onClick={() => toggleSaveRecipe(recipe.id)}
            className={`absolute top-2 right-2 btn btn-circle btn-sm border-0 ${
              isSaved ? "text-red-600" : "btn-ghost bg-white/80 dark:bg-primary"
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </figure>

        <div className="card-body p-4">
          <h2 className="card-title text-lg">
            {recipe.name}
            <div
              className={`badge text-white ${
                difficulties.find((d) => d.value === recipe.difficulty)
                  ?.color || "badge-ghost"
              }`}
            >
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
              <p className="text-xs font-semibold text-error mb-1">
                Expiring ingredients:
              </p>
              <div className="flex flex-wrap gap-1">
                {recipe.expiringIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="badge badge-white border-gray-400 badge-sm"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => openRecipeDetails(recipe)}
              className="btn btn-primary btn-sm"
            >
              <PiChefHatLight className="w-4 h-4" />
              View Recipe
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen  p-4 ">
      {/* Recipe Details Modal */}
      <RecipeDetailsModal recipe={selectedRecipe} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
          <PiChefHatLight className="w-10 h-10 text-primary" />
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
        <div className="form-control mb-4 relative">
          <div className="input-group ">
            <span className=" absolute left-3 top-3 z-10 bg-transparent">
              <FiSearch className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              className="input input-bordered w-full pl-10"
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
                className={`btn btn-sm ${
                  selectedCategory === cat.value ? "btn-primary" : "btn-ghost"
                }`}
              >
                {typeof cat.icon === "string" ? (
                  cat.icon
                ) : (
                  <cat.icon className="w-4 h-4" />
                )}
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
                className={`btn btn-sm ${
                  selectedDifficulty === diff.value
                    ? "btn-primary"
                    : "btn-ghost"
                }`}
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

        {/* <div className="stat">
          <div className="stat-title">Filtered Results</div>
          <div className="stat-value text-secondary">
            {filteredRecipes.length}
          </div>
          <div className="stat-desc">Matching your filters</div>
        </div> */}

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
          <PiChefHatLight className="w-20 h-20 mx-auto text-base-content/30 mb-4" />
          <h3 className="text-2xl font-bold mb-2">No recipes found</h3>
          <p className="text-base-content/70">
            Try adjusting your filters or search terms
          </p>
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
