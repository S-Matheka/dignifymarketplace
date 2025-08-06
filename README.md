# Dignify Marketplace

A modern, multi-role e-commerce platform designed to empower communities through sustainable commerce. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### Multi-Role Platform
- **Manufacturers**: List products and reach more customers
- **Sellers/Agents**: Earn commissions by serving local communities
- **Buyers**: Access essential products with flexible payment options
- **Donors**: Support communities through targeted donations
- **Transporters**: Manage deliveries and logistics
- **Admins**: Oversee platform operations

### Buyer Dashboard Features
- **Personalized Experience**: Greeting with user's first name
- **KPI Cards**: Track orders, wallet balance, wishlist, and active deliveries
- **Smart Search**: Find products by name or description
- **Category Filtering**: Browse by Water, Sanitation, Hygiene, Energy
- **Featured Kits**: Special product bundles with discounts
- **Shopping Cart**: Add, remove, and manage quantities
- **Checkout Flow**: Complete with delivery and payment options
- **Order Confirmation**: Professional order success experience

### Payment Options
- **M-Pesa**: Mobile money integration
- **Credit/Debit Cards**: Traditional payment methods
- **Lipa Pole Pole**: Flexible payment plans

### Mobile-First Design
- Responsive layout for all screen sizes
- Touch-friendly interface
- Mobile navigation bar
- Optimized for both web and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboards/          # Role-specific dashboards
│   │   ├── BuyerDashboard.tsx
│   │   ├── Cart.tsx
│   │   ├── OrderConfirmation.tsx
│   │   └── ...
│   ├── onboarding/          # User registration flow
│   ├── LandingPage.tsx      # Homepage
│   ├── MobileNavigation.tsx # Mobile nav component
│   └── ...
├── context/
│   ├── UserContext.tsx      # User state management
│   └── CartContext.tsx      # Shopping cart state
├── App.tsx                  # Main app component
└── main.tsx                 # Entry point
```

## 🎯 Key Components

### Buyer Dashboard
The main shopping interface featuring:
- Personalized greeting
- KPI overview cards
- Product browsing with search and filtering
- Shopping cart with quantity management
- Complete checkout flow
- Order confirmation

### Cart System
- Global cart state management
- Add/remove products
- Quantity controls
- Real-time total calculation
- Checkout integration

### Checkout Flow
1. **Cart Review**: View and edit cart items
2. **Delivery Options**: Pickup or home delivery
3. **Payment Selection**: M-Pesa, Card, or Lipa Pole Pole
4. **Order Summary**: Final review with totals
5. **Order Confirmation**: Success notification

## 🎨 Design Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons (minimum 44px)
- Optimized typography scaling

### User Experience
- Smooth animations and transitions
- Loading states and feedback
- Toast notifications for actions
- Modal dialogs for complex interactions
- Accessible design patterns

### Visual Design
- Clean, modern interface
- Purple brand colors
- Consistent spacing and typography
- Professional card-based layouts

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- Functional components with hooks
- Context API for state management

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for community empowerment
- Designed for sustainable commerce
- Focused on user experience and accessibility

---

**Dignify Marketplace** - Empowering communities through sustainable commerce and meaningful connections. 