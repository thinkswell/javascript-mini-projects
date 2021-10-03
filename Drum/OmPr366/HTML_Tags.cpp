#include <bits/stdc++.h>
#define ll long long
#define ld long double
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    ll T;
    cin >> T;

    while (T--)
    {
        string s;
        cin >> s;
        // cout<<s<<" ";
        int check = 0, space  =0 , go  = 0;
        if (s[0] != '<' || s[1] != '/' || s[s.length() - 1] != '>')
        {
            cout << "Error" << endl;
            check = 1;
            space = 1;
            go = 1;
        }
        if (go == 0){
            for (int i = 2; i < s.length() - 1; i++)
            {
                space =1;
                if (!((s[i] >= 97 && s[i] <= 122) || (s[i]>='0' && s[i]<= '9') ))
                {
                    cout << "Error" << endl;
                    check = 1;
                    break;
                }
            }
        }
    
        if (space == 0)
        {
            cout << "Error" << endl;
        }
        
        if (check == 0 && space == 1 )
        {
            cout << "Success" << endl;
            // cout<<" lk";
        }
    }
    return 0;
}