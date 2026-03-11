EPOCHS=50

echo "Estimating cost for MEDIUM file"
walrus store --dry-run --epochs $EPOCHS ../test_file_medium.txt

echo "Estimating cost for SMALL file"
walrus store --dry-run --epochs $EPOCHS ../test_file_small.txt
