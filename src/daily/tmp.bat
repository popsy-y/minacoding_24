@echo off
setlocal enabledelayedexpansion

REM 01.tsの内容を読み込む
set "inputFile=01.ts"
if not exist %inputFile% (
    echo %inputFile% が存在しません。
    exit /b 1
)

for /l %%i in (2,1,30) do (
    REM 2桁ゼロパディングを行う
    set "num=%%i"
    if %%i lss 10 set "num=0%%i"
    
    set "outputFile=!num!.ts"
    copy %inputFile% !outputFile! > nul
)

echo 連番ファイルの作成が完了しました。
