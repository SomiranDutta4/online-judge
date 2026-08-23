#!/bin/bash

lang=$1
output_file=$2
time_memory_file=$3
time_limit=$4
memory_limit=$5

RTE=0
CE=0

memArr=(3500 7500 95000 19000)
initMem=0

# Make sure required arguments exist
if [ -z "$lang" ] || [ -z "$output_file" ] || [ -z "$time_memory_file" ]; then
    echo "Invalid arguments passed to run.sh"
    echo "Usage: ./run.sh <language> <output_file> <time_memory_file> <time_limit> <memory_limit>"
    exit 1
fi

echo "Language: $lang"
echo "Output file: $output_file"
echo "Time/memory file: $time_memory_file"
echo "Time limit: $time_limit"
echo "Memory limit: $memory_limit"

if [ "$lang" = "c" ]; then
    initMem=${memArr[0]}
    if gcc -o solution solution.c &> "$output_file"; then

        if ! timeout "${time_limit}s" \
            /usr/bin/time -f "%e %M" -o "$time_memory_file" \
            ./solution < testcase.txt &>> "$output_file"; then

            RTE=1
        fi

    else
        CE=1
    fi

elif [ "$lang" = "cpp" ]; then

    initMem=${memArr[1]}

    if g++ -o solution solution.cpp &> "$output_file"; then

        if ! timeout "${time_limit}s" \
            /usr/bin/time -f "%e %M" -o "$time_memory_file" \
            ./solution < testcase.txt &>> "$output_file"; then

            RTE=1
        fi

    else
        CE=1
    fi

elif [ "$lang" = "java" ]; then

    initMem=${memArr[2]}

    if javac solution.java &> "$output_file"; then

        if ! timeout "${time_limit}s" \
            /usr/bin/time -f "%e %M" -o "$time_memory_file" \
            java solution < testcase.txt &>> "$output_file"; then

            RTE=1
        fi

    else
        CE=1
    fi

elif [ "$lang" = "py" ]; then

    initMem=${memArr[3]}

    if ! timeout "${time_limit}s" \
        /usr/bin/time -f "%e %M" -o "$time_memory_file" \
        python3 solution.py < testcase.txt &> "$output_file"; then

        RTE=1
    fi

else

    echo "Unsupported language: $lang" > "$output_file"
    RTE=1

fi

if [ "$CE" -ne 0 ]; then
    echo "COMPILATION ERROR" >> "$output_file"
fi


# Runtime error / timeout
if [ "$RTE" -ne 0 ]; then
    echo "RUNTIME ERROR" >> "$output_file"
fi


# Calculate time and memory only if execution succeeded
if [ "$CE" -eq 0 ] && [ "$RTE" -eq 0 ]; then

    if [ -s "$time_memory_file" ]; then

        arr=($(cat "$time_memory_file"))

        time_value=${arr[0]}
        memory_value=${arr[1]}

        # Convert seconds to milliseconds
        time=$(awk "BEGIN {printf \"%.0f\", $time_value * 1000}")

        # Memory difference
        memory=$((memory_value - initMem))

        # Time limit
        timeDiff=$((time_limit * 1000 - time))

        if [ "$timeDiff" -le 0 ]; then
            echo "TLE" >> "$output_file"
        fi

        # Memory limit
        memDiff=$((memory_limit * 1000 - memory))

        if [ "$memDiff" -le 0 ]; then
            echo "MLE" >> "$output_file"
        fi

    else

        time=0
        memory=0

    fi

else

    time=0
    memory=0

fi


# Write time and memory
echo "$time" >> "$time_memory_file"
echo "$memory" >> "$time_memory_file"