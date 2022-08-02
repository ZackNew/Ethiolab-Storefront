import {useUiState} from "~/composables";

export default async ({ app }) => {
    const {isDarkMode, toggleDarkMode} = useUiState();
    const cookieDark = app.$cookies.get('darkMode') ?? isDarkMode
    if (isDarkMode.value !== cookieDark){
        toggleDarkMode()
    }
  };
