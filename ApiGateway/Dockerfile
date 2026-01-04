# Base image for running the Gateway
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj and restore
COPY ./ApiGateway/ApiGateway.csproj ./ApiGateway/
RUN dotnet restore ./ApiGateway/ApiGateway.csproj

# Copy all source code
COPY . .
WORKDIR /src/ApiGateway

# Build project
RUN dotnet build ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "ApiGateway.dll"]
