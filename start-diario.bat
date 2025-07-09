@echo off
setlocal
title Diario WebApp - Simples

:: Define o diretório do script
cd /d "%~dp0"

:: Cria uma janela persistente
mode con: cols=80 lines=25

echo ========================================
echo      DIARIO WEBAPP - INICIO SIMPLES
echo ========================================
echo.

:: Verifica Node.js
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Instale em: https://nodejs.org/
    echo.
    pause
    exit
)

:: Verifica npm
where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo ERRO: npm nao encontrado!
    echo Reinstale Node.js em: https://nodejs.org/
    echo.
    pause
    exit
)

echo Node.js e npm encontrados!
echo.

:: Instala dependências se necessário
if not exist "node_modules" (
    echo Instalando dependencias...
    echo Por favor aguarde...
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo ERRO na instalacao! Tente executar como administrador.
        echo.
        pause
        exit
    )
    echo.
    echo Dependencias instaladas!
    echo.
)

:: Cria arquivo de dados se não existir
if not exist "diary-data.json" (
    echo Criando arquivo de dados...
    echo [] > diary-data.json
)

:: Verifica se a porta 3001 está em uso e finaliza processo se necessário
echo Verificando porta 3001...
netstat -ano | findstr :3001 >nul 2>&1
if %errorlevel% == 0 (
    echo Porta 3001 em uso. Finalizando processo anterior...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
        echo Finalizando PID: %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    echo Aguardando liberacao da porta...
    timeout /t 3 /nobreak >nul
    echo Porta liberada!
    echo.
) else (
    echo Porta 3001 disponivel!
    echo.
)

echo Iniciando servidor...
echo.
echo Acesse: http://localhost:3001
echo.

:: Abre navegador após 3 segundos
start /b powershell -WindowStyle Hidden -Command "Start-Sleep 3; Start-Process 'http://localhost:3001'"

echo Servidor iniciando... (Ctrl+C para parar)
echo.

:: Executa o servidor
node server.js

echo.
echo Servidor parado.
pause
