const tintColorLight = '#3B82F6'; // Main blue for light mode
const tintColorDark = '#60A5FA';  // Softer blue for dark mode

export default {
    primary: '#3B82F6', // Main blue for primary actions
    light: {
        text: '#11181C',           // dark text for light mode
        background: '#FFFFFF',      // white background
        tint: tintColorLight,       // primary blue
        icon: '#687076',            // medium gray icons
        tabIconDefault: '#687076',  // default tab icon
        tabIconSelected: tintColorLight, // selected tab icon
        cardBackground: '#F8FAFC', // light gray card background
        title: '#11181C',             // dark title text
    },
    dark: {
        text: '#F1F5F9',            // almost white text
        background: '#0F172A',      // deep navy background
        tint: tintColorDark,        // sky blue for main actions
        icon: '#9BA1A6',            // muted gray-blue icons
        tabIconDefault: '#9BA1A6',  // default tab icon
        tabIconSelected: tintColorDark, // selected tab icon
        cardBackground: '#1E293B', // dark gray card background
        title: '#F1F5F9',             // almost white title text
    },
};

