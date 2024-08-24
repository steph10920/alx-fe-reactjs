import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  // Action to update the search term
  setSearchTerm: (term) => set(state => {
    state.searchTerm = term;
    state.filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(term.toLowerCase()) ||
      recipe.preparationTime.toLowerCase().includes(term.toLowerCase())
    );
  }),

  // Action to set initial recipes
  setRecipes: (recipes) => set(state => {
    state.recipes = recipes;
    state.filteredRecipes = state.searchTerm
      ? recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.preparationTime.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      : recipes;
  }),
}));

export { useRecipeStore };
