@echo off
set foldername=project
if exist %foldername% (
rd /s/q %foldername%
echo delete %foldername%
)

:setpackage
set packagename=null
set/p packagename=�����������ռ����Ʋ��س�������ʹ���������ƣ��磺com.supermap����
if "%packagename:.=%"=="%packagename%" (
echo ���벻��ȷ��
goto setpackage
) else (
	goto setproject
)

:create
echo run phonegap creat.bat
call .\phonegap\bin\create .\%foldername% %packagename% %projectname%
if %errorlevel%==1 (
	goto error
)
goto copy2

:setproject
set projectname=null
set/p projectname=�����빤�������س����磺iclient����
if %projectname%==null (
echo ���벻��ȷ��
goto setproject
) else (
	goto create
)

:copy2
echo copy cordova-2.7.0.js
md .\%foldername%\assets\www\js
copy .\%foldername%\assets\www\cordova-2.7.0.js .\%foldername%\assets\www\js
del .\%foldername%\assets\www\cordova-2.7.0.js

echo copy libs
xcopy ..\..\libs .\%foldername%\assets\www\libs /s/e/i/y

echo copy theme
xcopy ..\..\theme .\%foldername%\assets\www\theme /s/e/i/y

echo copy img
xcopy .\img .\%foldername%\assets\www\img /s/e/i/y

echo copy js
xcopy .\js .\%foldername%\assets\www\js /s/e/i/y

echo copy html
xcopy .\html .\%foldername%\assets\www /s/e/i/y

echo copy jar
xcopy .\libs .\%foldername%\libs /s/e/i/y

echo copy xml
copy .\xml\config.xml .\%foldername%\res\xml
goto end
::echo copy src
::xcopy .\src .\%foldername%\src /s/e/i/y
:error 
pause
EXIT /B 1

:end
