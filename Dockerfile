# Etapa 1: Compilación
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción liviano
FROM nginx:alpine
# Copia la salida estática de Vite (carpeta dist) al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]