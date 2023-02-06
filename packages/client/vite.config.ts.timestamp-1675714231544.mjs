// ../client/vite.config.ts
import { defineConfig } from "file:///C:/Users/pas72/Documents/GitHub/yandex/20-businessmen-team-02/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/pas72/Documents/GitHub/yandex/20-businessmen-team-02/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/pas72/Documents/GitHub/yandex/20-businessmen-team-02/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: Number(process.env.SERVER_PORT) || 3001
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        main: "./src/main.tsx",
        "service-worker": "./src/service-worker.ts"
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === "service-worker" ? "[name].js" : "assets/[name]-[hash].js";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGFzNzJcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx5YW5kZXhcXFxcMjAtYnVzaW5lc3NtZW4tdGVhbS0wMlxcXFxwYWNrYWdlc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBhczcyXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxceWFuZGV4XFxcXDIwLWJ1c2luZXNzbWVuLXRlYW0tMDJcXFxccGFja2FnZXNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wYXM3Mi9Eb2N1bWVudHMvR2l0SHViL3lhbmRleC8yMC1idXNpbmVzc21lbi10ZWFtLTAyL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnXHJcblxyXG5kb3RlbnYuY29uZmlnKClcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgIF9fU0VSVkVSX1BPUlRfXzogTnVtYmVyKHByb2Nlc3MuZW52LlNFUlZFUl9QT1JUKSB8fCAzMDAxLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgaW5kZXg6ICcuL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgIG1haW46ICcuL3NyYy9tYWluLnRzeCcsXHJcbiAgICAgICAgJ3NlcnZpY2Utd29ya2VyJzogJy4vc3JjL3NlcnZpY2Utd29ya2VyLnRzJyxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGFzc2V0SW5mbyA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgPT09ICdzZXJ2aWNlLXdvcmtlcicgPyAnW25hbWVdLmpzJyA6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcydcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJhLFNBQVMsb0JBQW9CO0FBQ3hjLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxPQUFPO0FBR2QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxXQUFXLEtBQUs7QUFBQSxFQUMzQztBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04saUJBQWlCLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQ3REO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixlQUFhO0FBQzNCLGlCQUFPLFVBQVUsU0FBUyxtQkFBbUIsY0FBYztBQUFBLFFBQzdEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
