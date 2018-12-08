FROM node:8 as builder
WORKDIR /etc/todo-frontend
COPY nginx /etc/nginx/conf.d
RUN npm install -g @angular/cli@7.0.7
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod
RUN rm -f dist/todo-frontend/*.txt

FROM nginx:stable
COPY --from=builder /etc/todo-frontend/dist/todo-frontend /usr/share/nginx/html
EXPOSE 80
