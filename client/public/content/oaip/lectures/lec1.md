# Лекция 1: Основы алгоритмизации и программирования (ОАиП)

В этой лекции мы рассмотрим фундаментальные понятия алгоритмизации и программирования: что такое алгоритм, его свойства, виды, способы описания, а также напишем примеры на языке программирования **C#**.

---

## Что такое алгоритм?

**Алгоритм** — это конечная последовательность однозначных и понятных команд, направленных на достижение заданного результата.

### Свойства алгоритма:

- **Конечность** — алгоритм обязательно должен завершаться.
- **Однозначность** — каждое действие должно быть точно определено.
- **Массовость** — алгоритм может применяться к разным исходным данным.
- **Результативность** — алгоритм должен давать результат после выполнения.

> Алгоритмы лежат в основе любой программы, независимо от её сложности.

---

## Виды алгоритмов

Существует три основных типа алгоритмических структур:

1. **Линейные** — инструкции выполняются строго друг за другом.
2. **Разветвляющиеся** — выполняется один из возможных вариантов в зависимости от условия.
3. **Циклические** — одни и те же действия повторяются, пока выполняется условие.

---

## Способы описания алгоритмов

1. **Словесный (текстовый)** — описание на естественном языке.
2. **Графический (блок-схема)** — представление с помощью стандартных графических блоков.
3. **Псевдокод** — приближённый к языку программирования синтаксис.
4. **Программа** — реализация алгоритма на языке программирования.

---

## Графическое представление алгоритмов

Блок-схемы используются для наглядного описания логики алгоритма.

> 📌 _Место для изображения блок-схемы линейного алгоритма_  
> ![Линейный алгоритм](https://i.pinimg.com/736x/0b/89/59/0b8959e6de4c4bca85d0fc7d08964b9c.jpg)

> 📌 _Место для изображения разветвляющегося алгоритма_  
> ![Разветвляющийся алгоритм](https://i.pinimg.com/736x/8c/b6/1f/8cb61f5c432e146e4b9aad26cc5effbb.jpg)

> 📌 _Место для изображения циклического алгоритма_  
> ![Циклический алгоритм](https://i.pinimg.com/736x/f6/fa/17/f6fa17a8ac6c13f3fcbbd1c0c6d67dea.jpg)

---

## Примеры на C#

### Линейный алгоритм

```csharp
using System;

class Program
{
    static void Main()
    {
        int a = 10;
        int b = 20;
        int sum = a + b;
        Console.WriteLine("Сумма: " + sum);
    }
}
```

### Разветвляющийся алгоритм

```csharp
using System;

class Program
{
    static void Main()
    {
        int number = -5;

        if (number >= 0)
        {
            Console.WriteLine("Число положительное");
        }
        else
        {
            Console.WriteLine("Число отрицательное");
        }
    }
}
```

### Циклический алгоритм (цикл `for`)

```csharp
using System;

class Program
{
    static void Main()
    {
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine("Итерация " + i);
        }
    }
}
```

---

## Основные понятия программирования

- **Переменные** — именованные участки памяти, хранящие данные.
- **Типы данных** — определяют, какие значения может принимать переменная (int, double, string и др.).
- **Операторы** — символы или слова, задающие операции (арифметические, логические, сравнения и др.).
- **Условные конструкции** — if, else.
- **Циклы** — for, while, do-while.
- **Функции и методы** — блоки кода, выполняющие определённую задачу.

---

## Пример с пользовательским вводом

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Введите первое число: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Введите второе число: ");
        int b = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("Сумма чисел: " + (a + b));
    }
}
```

---

## Домашнее задание

1. Нарисуйте блок-схему линейного алгоритма сложения двух чисел.
2. Напишите программу на C#, которая:
   - Запрашивает у пользователя число.
   - Определяет, чётное оно или нет.
3. Реализуйте цикл, выводящий числа от 1 до 10.

---

## Заключение

Понимание основ алгоритмизации — ключ к эффективному программированию. Научившись правильно формулировать алгоритмы, вы сможете создавать надёжные и понятные программы.

---

> 📌 В следующей лекции мы подробно разберём **переменные и типы данных**, а также научимся работать с **вводом и выводом в C#**.