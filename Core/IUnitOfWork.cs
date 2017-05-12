using System;
using System.Threading.Tasks;

namespace _mosh_A2.Core
{

    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}