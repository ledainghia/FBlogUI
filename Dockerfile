# Sử dụng một hình ảnh Node.js như môi trường chạy ứng dụng React
FROM node:14

# Tạo thư mục làm việc và đặt làm thư mục hiện tại
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục hiện tại
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN yarn install

# Sao chép toàn bộ mã nguồn ứng dụng React vào thư mục hiện tại trong container
COPY . .

# Mở cổng mà ứng dụng React sẽ lắng nghe (thường là cổng 3000)
EXPOSE 3000

# Khởi động ứng dụng React trong chế độ phát triển và mở trình duyệt
CMD ["yarn", "run", "dev", "--open"]
