# Backend Go - Facility Asset Management

## Requirements
- Go 1.21+
- GCC (untuk SQLite driver)

## Setup & Run

```bash
cd backend

# Download dependencies
go mod tidy

# Build
go build -o server.exe .

# Run server
./server.exe
```

Server akan berjalan di `http://localhost:8080`

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Mutations
- `GET /api/mutations` - Get all mutations
- `POST /api/mutations` - Create mutation
- `PUT /api/mutations/:id` - Update mutation
- `DELETE /api/mutations/:id` - Delete mutation

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Contracts
- `GET /api/contracts` - Get all contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

### Master Vendors
- `GET /api/master-vendors` - Get all master vendors
- `POST /api/master-vendors` - Create master vendor
- `PUT /api/master-vendors/:id` - Update master vendor
- `DELETE /api/master-vendors/:id` - Delete master vendor

### General Masters
- `GET /api/masters/:category` - Get masters by category
- `POST /api/masters/:category` - Create master
- `PUT /api/masters/:category/:id` - Update master
- `DELETE /api/masters/:category/:id` - Delete master

### Assets (ATK/ARK)
- `GET /api/assets?type=ATK` - Get assets by type
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Master Items
- `GET /api/master-items?type=ATK` - Get master items by type
- `POST /api/master-items` - Create master item
- `PUT /api/master-items/:id` - Update master item
- `DELETE /api/master-items/:id` - Delete master item

## Database
Menggunakan SQLite, file database akan otomatis dibuat sebagai `facility.db`
