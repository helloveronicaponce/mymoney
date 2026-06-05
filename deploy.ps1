# MyMoney Deploy Script
cd "$PSScriptRoot"
git remote remove origin 2>$null
git remote add origin https://github.com/helloveroponce/mymoney.git
git branch -M main
git push -u origin main
