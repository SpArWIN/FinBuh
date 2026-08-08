FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080


FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["FinBuh.Api/FinBuh.ApiSystem/FinBuh.ApiSystem.csproj", "FinBuh.Api/FinBuh.ApiSystem/"]
COPY ["FinBuh/FinBuh.Common.Contracts/FinBuh.Common.Contracts.csproj", "FinBuh/FinBuh.Common.Contracts/"]

RUN dotnet restore "FinBuh.Api/FinBuh.ApiSystem/FinBuh.ApiSystem.csproj"

COPY . .

WORKDIR "/src/FinBuh.Api/FinBuh.ApiSystem"
RUN dotnet publish "FinBuh.ApiSystem.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FinBuh.ApiSystem.dll"]
