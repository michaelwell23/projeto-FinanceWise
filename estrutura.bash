server
│
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── taskController.ts
│   │   ├── userController.ts
│   │   └── ...
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── taskService.ts
│   │   ├── userService.ts
│   │   └── ...
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Task.ts
│   │   ├── Goal.ts
│   │   └── ...
│   │
│   ├── repositories/
│   │   ├── userRepository.ts
│   │   ├── taskRepository.ts
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── validationMiddleware.ts
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── taskRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   │   └── ...
│   │
│   ├── config/
│   │   ├── database.ts
│   │   ├── dotenv.ts
│   │   └── ...
│   │
│   └── app.ts
│
├── tests/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── ...
│
├── scripts/
│   ├── initDB.ts
│   └── ...
│
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
└── README.md
