import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  setSearchTerm: (term) => set(state => {
    // Update the search term and trigger filtering
    state.searchTerm = term;
    state.filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
  }),
  setRecipes: (recipes) => set(state => {
    state.recipes = recipes;
    // Reapply filtering if there's an existing search term
    state.filteredRecipes = state.searchTerm 
      ? recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      : recipes;
  })
}));

export { useRecipeStore };
