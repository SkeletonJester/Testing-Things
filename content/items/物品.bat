@echo off
echo ****************************************
echo *       您正在创建一个物品的json        *
echo *       请在mod目录下运行本bat        *
echo *       我已将基本的框架准备完毕        *
echo *       请输入要创建的物品的名称        *
set/p name=
echo *       您输入的物品名称为：%name%      *
echo *       请选择物品类型：                     *
echo *       1.material，这类物品允许发射   *
echo *       2.resource，这类物品不能发射   *
set/p a=
if %a% equ 1 goto io1
if %a% equ 2 goto io2
:typeend
echo *       您选择了%type%                       *
echo *       现在输入您对物品的介绍：          *
set/p description=
echo *       您对该物品的描述是：                *
echo *       %description%                           *
echo *       该物品的默认颜色是(十六进制）：*
set/p color= 
echo *       物品的默认颜色是：%color%      *
echo *       开始生成json文件......                  *
goto info
:end
echo *       json已生成，保存在：                *
echo *       content/items/%json%             *
pause
goto ennd

:io1
set type=material
goto typeend
:io2
set type=resource
goto typeend

:info
set json=%name%.json
md content
cd content
md items
cd items
echo {>%json%
echo "type":"%type%",>>%json%
echo "name":"%name%",>>%json%
echo "description":"%description%",>>%json%
echo "color":"%color%">>%json%
echo }>>%json%
goto end

:ennd