@echo off
echo ****************************************
echo *       �����ڴ���һ����Ʒ��json        *
echo *       ����modĿ¼�����б�bat        *
echo *       ���ѽ������Ŀ��׼�����        *
echo *       ������Ҫ��������Ʒ������        *
set/p name=
echo *       ���������Ʒ����Ϊ��%name%      *
echo *       ��ѡ����Ʒ���ͣ�                     *
echo *       1.material��������Ʒ������   *
echo *       2.resource��������Ʒ���ܷ���   *
set/p a=
if %a% equ 1 goto io1
if %a% equ 2 goto io2
:typeend
echo *       ��ѡ����%type%                       *
echo *       ��������������Ʒ�Ľ��ܣ�          *
set/p description=
echo *       ���Ը���Ʒ�������ǣ�                *
echo *       %description%                           *
echo *       ����Ʒ��Ĭ����ɫ��(ʮ�����ƣ���*
set/p color= 
echo *       ��Ʒ��Ĭ����ɫ�ǣ�%color%      *
echo *       ��ʼ����json�ļ�......                  *
goto info
:end
echo *       json�����ɣ������ڣ�                *
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